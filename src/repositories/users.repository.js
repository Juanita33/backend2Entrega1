import { UsersDAO } from "../dao/mongo/users.dao.js";

export class UsersRepository {
  constructor() {
    this.dao = new UsersDAO();
  }

  getByEmail(email) { return this.dao.getByEmail(email); }
  getById(id) { return this.dao.getById(id); }
  createUser(data) { return this.dao.create(data); }
  updateUser(id, data) { return this.dao.updateById(id, data); }
}