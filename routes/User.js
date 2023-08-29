import express from "express";
import { deleteUser, updateUser } from "../collection/User.js";
import { verifyTokenAndAuthorization } from "../TokenVerification.js";

const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

export default router;
