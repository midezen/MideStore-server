import Cart from "../models/Cart.js";

export const getAllCarts = async (req, res) => {
  try {
    const Carts = await Cart.find();
    res.status(200).json(Carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user.id });
    res.status(200).json(userCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
