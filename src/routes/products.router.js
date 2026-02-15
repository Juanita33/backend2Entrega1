import { Router } from "express";
import passport from "passport";
import { authorizeRoles } from "../middlewares/authorization.js";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router();

router.get("/", ProductsController.getAll);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  ProductsController.create
);

router.put(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  ProductsController.update
);

router.delete(
  "/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("admin"),
  ProductsController.remove
);

export default router;