import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../TokenVerification.js";
import {
  createCart,
  deleteCart,
  getUserCart,
  updateCart,
  getAllCarts,
} from "../collection/Cart.js";

const router = express.Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyToken, updateCart);
router.delete("/:id", verifyToken, deleteCart);
router.get("/", verifyTokenAndAdmin, getAllCarts);
router.get("/", verifyToken, getUserCart);

export default router;
