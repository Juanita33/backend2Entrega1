import { Router } from "express";
import usersRouter from "./users.router.js";
import sessionsRouter from "./sessions.router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);

export default router;
