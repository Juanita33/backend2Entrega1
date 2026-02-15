import { ProductModel } from "../../models/product.model.js";

export class ProductsDAO {
  getById(id) { return ProductModel.findById(id); }
  getAll() { return ProductModel.find().lean(); }
  create(data) { return ProductModel.create(data); }
  updateById(id, data) { return ProductModel.findByIdAndUpdate(id, data, { new: true }); }
  deleteById(id) { return ProductModel.findByIdAndDelete(id); }
}