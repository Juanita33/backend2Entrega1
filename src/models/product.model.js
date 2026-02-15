import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    status: { type: Boolean, default: true },
    thumbnails: { type: [String], default: [] },

    // (opcional) para mejoras de roles (premium/owner)
    owner: { type: String, default: "admin" }
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Products", productSchema);