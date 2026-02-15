import dotenv from "dotenv";

dotenv.config();

export const config = {
  // DB
  mongoUrl: process.env.MONGO_URL,

  // Server
  port: Number(process.env.PORT) || 8080,
  appBaseUrl: process.env.APP_BASE_URL || `http://localhost:${process.env.PORT || 8080}`,

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES || "1d",

  // Mail
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
  mailFrom: process.env.MAIL_FROM,
  resetTokenExpiresMin: Number(process.env.RESET_TOKEN_EXPIRES_MIN || 60),
  
};

