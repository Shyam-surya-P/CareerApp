import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: String,
  category: String, // interest, aptitude, personality, values
  options: [
    {
      text: String,
      type: String, // tech, creative, business
    },
  ],
});

export default mongoose.model("Question", questionSchema);