import { CartsDAO } from "../dao/mongo/carts.dao.js";

export class CartsRepository {
  constructor() { this.dao = new CartsDAO(); }
  create() { return this.dao.create(); }
  getById(id) { return this.dao.getById(id); }
}