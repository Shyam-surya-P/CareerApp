import mongoose from "mongoose";

const assessmentQuestionSchema = new mongoose.Schema(
  {
    externalId: { type: String, unique: true, index: true },
    questionText: { type: String, required: true },
    category: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("AssessmentQuestion", assessmentQuestionSchema);

