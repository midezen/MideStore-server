import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String },
    img2: { type: String },
    size: { type: Array, required: true },
    price: { type: Number, required: true },
    cat: { type: Array, required: true },
    subCat: { type: Array, required: true },
    inStock: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
