import AssessmentQuestion from "../models/AssessmentQuestion.js";
import AssessmentAttempt from "../models/AssessmentAttempt.js";
import { calculateResult } from "../utils/scoring.js";
import { isDbReady } from "../utils/isDbReady.js";
import { inMemoryStore } from "../utils/inMemoryStore.js";
import { questionBank } from "../data/questionBank.js";
import { buildDashboard } from "../utils/careerEngine.js";
import Profile from "../models/Profile.js";

async function getOrSeedQuestions() {
  const existing = await AssessmentQuestion.find().lean();
  if (existing.length) return existing;

  await AssessmentQuestion.insertMany(
    questionBank.map((q) => ({
      externalId: q.id,
      questionText: q.questionText,
      category: q.category,
      options: q.options,
    }))
  );

  return await AssessmentQuestion.find().lean();
}

export const getQuestions = async (req, res) => {
  if (!isDbReady()) {
    return res.json(questionBank);
  }

  const questions = await getOrSeedQuestions();
  res.json(questions);
};

export const submitAssessment = async (req, res) => {
  try {
    const answers = Array.isArray(req.body) ? req.body : req.body?.answers;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        message: "Invalid payload. Expected { answers: [...] }",
      });
    }

    const invalidIdx = answers.findIndex(
      (a) => !a || !a.questionId || !a.type
    );
    if (invalidIdx !== -1) {
      return res.status(400).json({
        message:
          "Invalid answers. Each item must include { questionId, type }.",
        index: invalidIdx,
      });
    }

    const questions = isDbReady() ? await getOrSeedQuestions() : questionBank;
    const profile = isDbReady()
      ? await Profile.findOne({ userId: req.user }).lean()
      : await inMemoryStore.getProfile(req.user);

    const resultData = calculateResult(answers, questions);
    const dashboard = buildDashboard({
      rankedClusters: resultData.rankedClusters,
      evidence: resultData.evidence,
      profile,
    });

    if (!isDbReady()) {
      const saved = await inMemoryStore.saveResult(req.user, {
        answers,
        scores: resultData.scores,
        dimensionScores: resultData.dimensionScores,
        topCluster: resultData.topCluster,
        dashboard,
      });
      return res.json(saved);
    }

    const attempt = await AssessmentAttempt.create({
      userId: req.user,
      answers,
      scores: resultData.scores,
      dimensionScores: resultData.dimensionScores,
      topCluster: resultData.topCluster,
      dashboard,
    });

    return res.json(attempt);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to submit assessment",
      error: err?.message || String(err),
    });
  }
};

export const getResult = async (req, res) => {
  if (!isDbReady()) {
    const result = await inMemoryStore.getLatestResult(req.user);
    return res.json(result);
  }

  const result = await AssessmentAttempt.findOne({ userId: req.user })
    .sort({ createdAt: -1 })
    .lean();
  res.json(result);
};