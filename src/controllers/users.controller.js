import { UsersService } from "../services/users.service.js";

export const UsersController = {
  getAll: async (req, res) => {
    const users = await UsersService.getAll();
    res.json({ status: "success", payload: users });
  },

  getById: async (req, res) => {
    const user = await UsersService.getById(req.params.uid);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    res.json({ status: "success", payload: user });
  },

  update: async (req, res) => {
    const updated = await UsersService.update(req.params.uid, req.body);
    if (!updated) return res.status(404).json({ status: "error", message: "User not found" });
    res.json({ status: "success", payload: updated });
  },

  remove: async (req, res) => {
    const deleted = await UsersService.remove(req.params.uid);
    if (!deleted) return res.status(404).json({ status: "error", message: "User not found" });
    res.json({ status: "success", message: "User deleted" });
  }
};
