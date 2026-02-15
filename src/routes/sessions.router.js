import { Router } from "express";
import passport from "passport";
import { SessionsController } from "../controllers/sessions.controller.js";
import { PasswordController } from "../controllers/password.controller.js";

const router = Router();

/*REGISTER*/
router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  SessionsController.register
);

/* 
   LOGIN (JWT)*/
router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: info?.message || "Login failed"
      });
    }

    req.user = user;
    return SessionsController.login(req, res);
  })(req, res, next);
});

/* 
   CURRENT (valida JWT y devuelve DTO)*/
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  SessionsController.current
);

/* 
   PASSWORD RECOVERY*/

/**
 * 1️ Enviar correo con link de recuperación
 * POST /api/sessions/forgot-password
 */
router.post("/forgot-password", PasswordController.forgot);

/**
 * 2️ Validar token (expira en 1 hora)
 * GET /api/sessions/reset-password?token=xxxxx
 */
router.get("/reset-password", PasswordController.validateToken);

/**
 * 3️ Cambiar contraseña
 * POST /api/sessions/reset-password
 */
router.post("/reset-password", PasswordController.reset);

export default router;
