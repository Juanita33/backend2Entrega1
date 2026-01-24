import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";

const router = Router();

router.get("/", UsersController.getAll);
router.get("/:uid", UsersController.getById);
router.put("/:uid", UsersController.update);
router.delete("/:uid", UsersController.remove);

export default router;
