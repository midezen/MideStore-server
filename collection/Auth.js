import User from "../models/User.js";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

dotenv.config();

export const register = async (req, res) => {
  const encrypted = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.pass_sec
  );
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: encrypted,
    email: req.body.email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user &&
      res
        .status(404)
        .json(
          "User does not exist, Please check your credentials and try again"
        );
    const decrypted = CryptoJS.AES.decrypt(
      user.password,
      process.env.pass_sec
    ).toString(CryptoJS.enc.Utf8);

    decrypted !== req.body.password &&
      res.status(401).json("Incorrect Password");

    const { password, ...others } = user._doc;
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.jwt_sec,
      { expiresIn: "1d" }
    );

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(others);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token", { sameSite: "none", secure: true })
      .status(200)
      .json("You've logged out successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
