import { v4 as uuidv4 } from "uuid";
import { config } from "../config/env.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { PasswordResetRepository } from "../repositories/passwordReset.repository.js";
import { MailService } from "./mail.service.js";
import { createHash, isValidPassword } from "../utils/hash.js";

const usersRepo = new UsersRepository();
const resetRepo = new PasswordResetRepository();

export const PasswordResetService = {
  requestReset: async (email) => {
    const user = await usersRepo.getByEmail(email);

    // Responder siempre igual por seguridad
    if (!user) return { ok: true };

    const token = uuidv4();
    
    const expiresAt = new Date(Date.now() + config.resetTokenExpiresMin * 60 * 1000);

    await resetRepo.create({ userId: user._id, token, expiresAt });

    const link = `${config.appBaseUrl}/api/sessions/reset-password?token=${token}`;
    await MailService.sendResetPasswordEmail(user.email, link);

    return { ok: true };
  },

  validateToken: async (token) => {
    const record = await resetRepo.findByToken(token);

    if (!record || record.used) return { ok: false, error: "Invalid token" };
    if (record.expiresAt < new Date()) return { ok: false, error: "Token expired" };

    return { ok: true };
  },

  resetPassword: async (token, newPassword) => {
    const record = await resetRepo.findByToken(token);

    if (!record || record.used) return { ok: false, error: "Invalid token" };
    if (record.expiresAt < new Date()) return { ok: false, error: "Token expired" };

    const user = await usersRepo.getById(record.userId);
    if (!user) return { ok: false, error: "User not found", status: 404 };

    if (isValidPassword(newPassword, user.password)) {
      return { ok: false, error: "New password cannot be the same as old password" };
    }

    await usersRepo.updateUser(user._id, { password: createHash(newPassword) });

    await resetRepo.markUsed(token);

    return { ok: true };
  }
};