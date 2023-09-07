import express from "express";
import { verifyToken, verifyTokenAndAdmin } from "../TokenVerification.js";
import {
  createOrder,
  deleteOrder,
  getOrders,
  getUserOrders,
  updateOrder,
} from "../collection/Order.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/", verifyTokenAndAdmin, getOrders);
router.get("/", verifyToken, getUserOrders);

export default router;
