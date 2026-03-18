import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  scores: Object,
  topCareer: String,
});

export default mongoose.model("Result", resultSchema);