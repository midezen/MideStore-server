import express from "express";
import { login, logout, register } from "../collection/Auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
