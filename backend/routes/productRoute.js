import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
} from "../controller/productController.js";
import { isAuthenticatedUser, authorizeRole } from "../middleware/auth.js";

const router = express.Router();

// router.route("/product").get()
router
  .get("/products", getAllProducts)
  .get("/product/:id", getProductDetail)
  .post(
    "/admin/product/new",
    isAuthenticatedUser,
    authorizeRole("admin"),
    createProduct
  )
  .put(
    "/admin/product/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    updateProducts
  )
  .delete(
    "/admin/product/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    deleteProduct
  )
  .put("/review", isAuthenticatedUser, createProductReview)
  .get("/reviews", getProductReviews)
  .delete("/reviews", isAuthenticatedUser, deleteProductReviews)
  .get(
    "/admin/products",
    isAuthenticatedUser,
    authorizeRole("admin"),
    getAdminProducts
  );

export default router;
