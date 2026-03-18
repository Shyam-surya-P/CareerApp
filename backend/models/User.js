import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    // Use a dedicated collection so we don't clash with
    // any legacy `users` collection or its indexes.
    collection: "career_users",
  }
);

export default mongoose.model("User", userSchema);