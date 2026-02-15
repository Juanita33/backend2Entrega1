import { PasswordResetService } from "../services/passwordReset.service.js";

export const PasswordController = {
  forgot: async (req, res) => {
    try {
      const { email } = req.body;

      await PasswordResetService.requestReset(email);

      return res.json({
        status: "success",
        message: "If the email exists, a reset link was sent."
      });
    } catch (err) {
      console.error("❌ FORGOT PASSWORD ERROR:", err);
      return res.status(500).json({
        status: "error",
        message: err.message || "Internal server error"
      });
    }
  },

  validateToken: async (req, res) => {
    try {
      const { token } = req.query;
      const result = await PasswordResetService.validateToken(token);

      if (!result.ok) {
        return res.status(400).json({ status: "error", message: result.error });
      }

      return res.json({ status: "success", message: "Token valid" });
    } catch (err) {
      console.error("❌ VALIDATE TOKEN ERROR:", err);
      return res.status(500).json({
        status: "error",
        message: err.message || "Internal server error"
      });
    }
  },

  reset: async (req, res) => {
    try {
      const { token, newPassword } = req.body;
      const result = await PasswordResetService.resetPassword(token, newPassword);

      if (!result.ok) {
        const status = result.status || 400;
        return res.status(status).json({ status: "error", message: result.error });
      }

      return res.json({ status: "success", message: "Password updated" });
    } catch (err) {
      console.error("❌ RESET PASSWORD ERROR:", err);
      return res.status(500).json({
        status: "error",
        message: err.message || "Internal server error"
      });
    }
  }
};