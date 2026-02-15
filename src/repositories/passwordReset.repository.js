import { PasswordResetDAO } from "../dao/mongo/passwordReset.dao.js";

export class PasswordResetRepository {
  constructor() {
    this.dao = new PasswordResetDAO();
  }

  create(data) {
    return this.dao.create(data);
  }

  findByToken(token) {
    return this.dao.findByToken(token);
  }

  markUsed(token) {
    return this.dao.markUsed(token);
  }
}