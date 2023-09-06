import CryptoJS from "crypto-js";
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsers = async (req, res) => {
  const newQuery = req.query.new;
  try {
    const user = newQuery
      ? await User.find().sort({ createdAt: "desc" }).limit(5)
      : await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateUser = async (req, res) => {
  if (req.body.password) {
    const encrypted = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.pass_sec
    ).toString();
    req.body.password = encrypted;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res
      .clearCookie("access_token", { sameSite: "none", secure: true })
      .status(200)
      .json("You've successfully deleted this user");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
