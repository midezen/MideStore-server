import CryptoJS from "crypto-js";
import User from "../models/User.js";

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
