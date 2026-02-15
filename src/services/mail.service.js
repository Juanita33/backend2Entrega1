export const MailService = {
    sendResetPasswordEmail: async (to, link) => {
      console.log("📩 Simulated email to:", to);
      console.log("🔗 RESET LINK:", link);
      return true;
    }
  };