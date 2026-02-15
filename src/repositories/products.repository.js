import { ProductsDAO } from "../dao/mongo/products.dao.js";

export class ProductsRepository {
  constructor() { this.dao = new ProductsDAO(); }
  getById(id) { return this.dao.getById(id); }
  getAll() { return this.dao.getAll(); }
  create(data) { return this.dao.create(data); }
  updateById(id, data) { return this.dao.updateById(id, data); }
  deleteById(id) { return this.dao.deleteById(id); }
}