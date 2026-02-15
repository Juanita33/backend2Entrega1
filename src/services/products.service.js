import { ProductsRepository } from "../repositories/products.repository.js";

const repo = new ProductsRepository();

export const ProductsService = {
  getAll: () => repo.getAll(),
  create: (data) => repo.create(data),
  update: (pid, data) => repo.updateById(pid, data),
  remove: (pid) => repo.deleteById(pid)
};