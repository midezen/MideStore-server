import express from "express";
import {
  deleteUser,
  getUser,
  getUserStats,
  getUsers,
  updateUser,
} from "../collection/User.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../TokenVerification.js";

const router = express.Router();

router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getUsers);
router.get("/userStats", verifyTokenAndAdmin, getUserStats);
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

export default router;
