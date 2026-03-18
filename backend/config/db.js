import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = (process.env.MONGO_URI || "").trim();
    const looksLikeMongoUri =
      uri.startsWith("mongodb://") || uri.startsWith("mongodb+srv://");

    if (!looksLikeMongoUri) {
      console.warn(
        '⚠️  Skipping MongoDB connection: set MONGO_URI to a valid "mongodb://" or "mongodb+srv://" connection string.'
      );
      return;
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    console.warn("⚠️  Continuing without MongoDB connection.");
  }
};

export default connectDB;