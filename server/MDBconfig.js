import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error in MongoDB connection:", error.message);
  }
};

export default connectMDB;
