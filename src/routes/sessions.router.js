import { Router } from "express";
import passport from "passport";
import { SessionsController } from "../controllers/sessions.controller.js";

const router = Router();

// Register
router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  SessionsController.register
);

// Login (JWT)
router.post("/login", (req, res, next) => {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ status: "error", message: info?.message || "Login failed" });

    req.user = user;
    return SessionsController.login(req, res);
  })(req, res, next);
});

// Current (valida JWT)
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  SessionsController.current
);

export default router;
