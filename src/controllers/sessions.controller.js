import { SessionsService } from "../services/sessions.service.js";

export const SessionsController = {
  register: async (req, res) => {
    // passport ya creó el user si llegó aquí
    res.status(201).json({ status: "success", message: "User registered" });
  },

  login: async (req, res) => {
    const { token } = SessionsService.loginResponse(req.user);
    res.json({ status: "success", token });
  },

  current: async (req, res) => {
    res.json({ status: "success", payload: req.user });
  }
};
