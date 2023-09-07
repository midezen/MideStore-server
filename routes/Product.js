import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../TokenVerification.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getOneProduct,
} from "../collection/Product.js";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, createProduct);
router.put("/:id", verifyTokenAndAdmin, updateProduct);
router.get("/", getProducts);
router.get("/find/:id", getOneProduct);
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

export default router;
