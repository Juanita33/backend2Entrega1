import { SessionsService } from "../services/sessions.service.js";
import { UserCurrentDTO } from "../dtos/userCurrent.dto.js";

export const SessionsController = {
  // Register: passport "register" ya creó el usuario si llega aquí
  register: async (req, res) => {
    return res.status(201).json({
      status: "success",
      message: "User registered"
    });
  },

  // Login: recibe req.user (seteado en sessions.router.js) y devuelve JWT
  login: async (req, res) => {
    const { token } = SessionsService.loginResponse(req.user);

    return res.json({
      status: "success",
      token
    });
  },

  // Current: devuelve SOLO datos no sensibles usando DTO
  current: async (req, res) => {
    
    if (!req.user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized"
      });
    }

    const safeUser = new UserCurrentDTO(req.user);

    return res.json({
      status: "success",
      payload: safeUser
    });
  }
};