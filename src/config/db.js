import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async () => {
  if (!config.mongoUrl) throw new Error("MONGO_URL no está configurado en .env");
  await mongoose.connect(config.mongoUrl);
  console.log("✅ MongoDB connected");
};
