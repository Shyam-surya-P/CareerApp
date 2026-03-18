import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    fullName: String,
    grade: String,
    academicStrengths: [String],
    interests: [String],
    preferredWorkStyle: String,
    futureGoal: String,
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);

