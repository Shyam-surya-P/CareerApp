const WEIGHTS_BY_CATEGORY = {
  interest: 3,
  aptitude: 3,
  personality: 2,
  values: 2,
  academic_strength: 2,
  future: 1,
};

const CLUSTER_LABELS = {
  technology: "Technology & Engineering",
  creative: "Creative & Design",
  business: "Business & Management",
  healthcare: "Healthcare & Psychology",
  education: "Education & Social Impact",
};

export const calculateResult = (answers = [], questions = []) => {
  const questionById = new Map(
    questions.map((q) => [String(q._id || q.id), q])
  );

  const scores = {};
  const dimensionScores = {};
  const evidence = {};

  for (const ans of answers) {
    const q = questionById.get(String(ans.questionId)) || null;
    const category = q?.category || "interest";
    const weight = WEIGHTS_BY_CATEGORY[category] ?? 1;
    const clusterKey = ans.type;

    scores[clusterKey] = (scores[clusterKey] || 0) + weight;
    dimensionScores[category] = (dimensionScores[category] || 0) + weight;

    evidence[clusterKey] = evidence[clusterKey] || [];
    if (q?.questionText) evidence[clusterKey].push(q.questionText);
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const ranked = Object.entries(scores)
    .map(([k, v]) => ({
      key: k,
      label: CLUSTER_LABELS[k] || k,
      score: v,
      fitPercent: Math.round((v / total) * 100),
    }))
    .sort((a, b) => b.score - a.score);

  const top = ranked[0] || {
    key: "technology",
    label: CLUSTER_LABELS.technology,
    score: 1,
    fitPercent: 100,
  };

  return {
    scores,
    dimensionScores,
    rankedClusters: ranked,
    topCluster: top.key,
    topCareerClusterLabel: top.label,
    evidence,
  };
};
