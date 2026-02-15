import { PasswordResetTokenModel } from "../../models/passwordResetToken.model.js";

export class PasswordResetDAO {
  create(data) {
    return PasswordResetTokenModel.create(data);
  }

  findByToken(token) {
    return PasswordResetTokenModel.findOne({ token });
  }

  markUsed(token) {
    return PasswordResetTokenModel.updateOne({ token }, { $set: { used: true } });
  }
}