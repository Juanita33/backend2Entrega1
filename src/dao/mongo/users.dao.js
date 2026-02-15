import { UserModel } from "../../models/user.model.js";

export class UsersDAO {
  getByEmail(email) { return UserModel.findOne({ email }); }
  getById(id) { return UserModel.findById(id); }
  create(data) { return UserModel.create(data); }
  updateById(id, data) { return UserModel.findByIdAndUpdate(id, data, { new: true }); }
}