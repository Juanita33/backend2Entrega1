import { CartsService } from "../services/carts.service.js";

export const CartsController = {
  create: async (req, res) => {
    try {
      const cart = await CartsService.createCart();
      return res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  },

  addProduct: async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const quantity = Number(req.body.quantity || 1);

      const cart = await CartsService.addProduct(cid, pid, quantity);
      if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

      return res.json({ status: "success", payload: cart });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
};