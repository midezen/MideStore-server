import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
  } catch (err) {
    res.status(500).json(err);
  }
};
