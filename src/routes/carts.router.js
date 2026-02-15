
import { Router } from "express";
import passport from "passport";
import { authorizeRoles } from "../middlewares/authorization.js";
import { CartsController } from "../controllers/carts.controller.js";
import { PurchaseController } from "../controllers/purchase.controller.js";

const router = Router();

// Crear carrito (público)
router.post("/", CartsController.create);

// Agregar producto (solo user)
router.post(
  "/:cid/product/:pid",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  CartsController.addProduct
);

// Compra (solo user)
router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorizeRoles("user"),
  PurchaseController.purchase
);

export default router;