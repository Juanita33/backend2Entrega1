import { Router } from "express";
import usersRouter from "./users.router.js";
import sessionsRouter from "./sessions.router.js";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

export default router;
