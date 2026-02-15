import { PurchaseService } from "../services/purchase.service.js";

export const PurchaseController = {
  purchase: async (req, res) => {
    const { cid } = req.params;

    // req.user viene del JWT (tu strategy devuelve jwt_payload.user)
    const purchaserEmail = req.user?.email;
    if (!purchaserEmail) return res.status(401).json({ status: "error", message: "Unauthorized" });

    const result = await PurchaseService.purchaseCart(cid, purchaserEmail);

    if (result?.error === "Cart not found") {
      return res.status(404).json({ status: "error", message: "Cart not found" });
    }

    return res.json({ status: "success", payload: result });
  }
};