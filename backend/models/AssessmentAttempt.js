import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    answers: [
      {
        questionId: { type: String },
        type: { type: String },
      },
    ],
    scores: { type: Object, default: {} },
    dimensionScores: { type: Object, default: {} },
    topCluster: String,
    dashboard: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("AssessmentAttempt", attemptSchema);

