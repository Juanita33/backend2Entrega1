import { ProductsService } from "../services/products.service.js";

export const ProductsController = {
  getAll: async (req, res) => {
    const products = await ProductsService.getAll();
    res.json({ status: "success", payload: products });
  },

  create: async (req, res) => {
    const created = await ProductsService.create(req.body);
    res.status(201).json({ status: "success", payload: created });
  },

  update: async (req, res) => {
    const updated = await ProductsService.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ status: "error", message: "Product not found" });
    res.json({ status: "success", payload: updated });
  },

  remove: async (req, res) => {
    const deleted = await ProductsService.remove(req.params.pid);
    if (!deleted) return res.status(404).json({ status: "error", message: "Product not found" });
    res.json({ status: "success", message: "Product deleted" });
  }
};