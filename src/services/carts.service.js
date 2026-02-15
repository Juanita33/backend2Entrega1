import { CartsRepository } from "../repositories/carts.repository.js";

const repo = new CartsRepository();

export const CartsService = {
  createCart: () => repo.create(),

  addProduct: async (cid, pid, quantity = 1) => {
    const cart = await repo.getById(cid);
    if (!cart) return null;

    const idx = cart.products.findIndex((p) => String(p.product._id) === String(pid));
    if (idx >= 0) cart.products[idx].quantity += quantity;
    else cart.products.push({ product: pid, quantity });

    await cart.save();
    return cart;
  }
};