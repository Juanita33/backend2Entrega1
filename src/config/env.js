import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || "1d",
  port: Number(process.env.PORT) || 8080
};
