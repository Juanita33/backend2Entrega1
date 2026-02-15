import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const PasswordResetTokenModel = mongoose.model("PasswordResetTokens", schema);