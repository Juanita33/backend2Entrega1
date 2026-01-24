import { UserModel } from "../models/user.model.js";

export const UsersService = {
  getAll: async () => UserModel.find().select("-password").lean(),
  getById: async (id) => UserModel.findById(id).select("-password").lean(),
  update: async (id, data) =>
    UserModel.findByIdAndUpdate(id, data, { new: true }).select("-password").lean(),
  remove: async (id) => UserModel.findByIdAndDelete(id).lean()
};
