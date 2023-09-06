import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("Cart", CartSchema);
