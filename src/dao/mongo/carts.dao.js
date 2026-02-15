import { CartModel } from "../../models/cart.model.js";

export class CartsDAO {
  create() { return CartModel.create({ products: [] }); }
  getById(id) { return CartModel.findById(id).populate("products.product"); }
}