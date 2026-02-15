import { v4 as uuidv4 } from "uuid";
import { ProductsRepository } from "../repositories/products.repository.js";
import { CartsRepository } from "../repositories/carts.repository.js";
import { TicketsRepository } from "../repositories/tickets.repository.js";

const productsRepo = new ProductsRepository();
const cartsRepo = new CartsRepository();
const ticketsRepo = new TicketsRepository();

export const PurchaseService = {
  purchaseCart: async (cid, purchaserEmail) => {
    const cart = await cartsRepo.getById(cid);
    if (!cart) return { error: "Cart not found" };

    const purchased = [];
    const notPurchased = [];
    let amount = 0;

    for (const item of cart.products) {
      const qty = item.quantity;

      // item.product puede venir populado (objeto) o como ObjectId
      const productId = item.product?._id ?? item.product;

      if (!productId) {
        notPurchased.push({ product: null, quantity: qty });
        continue;
      }

      // si viene populado úsalo, si no, lo buscamos
      const prod = item.product?.stock !== undefined
        ? item.product
        : await productsRepo.getById(productId);

      if (!prod) {
        notPurchased.push({ product: productId, quantity: qty });
        continue;
      }

      if (prod.stock >= qty) {
        const newStock = prod.stock - qty;

        // ✅ mantener patrón Repository
        await productsRepo.updateById(prod._id, { stock: newStock });

        purchased.push({ product: prod._id, quantity: qty });
        amount += prod.price * qty;
      } else {
        notPurchased.push({ product: prod._id, quantity: qty });
      }
    }

    // dejar solo los no comprados
    cart.products = notPurchased
      .filter((x) => x.product) // evita nulls
      .map((x) => ({ product: x.product, quantity: x.quantity }));

    await cartsRepo.updateProducts(cid, cart.products); // ideal (si lo tienes)
    // Si no tienes updateProducts, puedes dejar:
    // await cart.save();

    if (purchased.length === 0) {
      return {
        status: "incomplete",
        message: "No stock for any product",
        ticket: null,
        remainingProducts: cart.products
      };
    }

    const ticket = await ticketsRepo.create({
      code: uuidv4(),
      amount,
      purchaser: purchaserEmail
    });

    return {
      status: notPurchased.length === 0 ? "complete" : "incomplete",
      ticket,
      remainingProducts: cart.products
    };
  }
};