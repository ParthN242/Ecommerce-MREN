import express from "express";
import {
  createOrder,
  deleteOrders,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrders,
} from "../controller/orderController.js";
import { authorizeRole, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router
  .post("/order/new", isAuthenticatedUser, createOrder)
  .get(
    "/order/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    getSingleOrder
  )
  .get("/orders/me", isAuthenticatedUser, myOrders)
  .get(
    "/admin/orders",
    isAuthenticatedUser,
    authorizeRole("admin"),
    getAllOrders
  )
  .put(
    "/admin/order/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    updateOrders
  )
  .delete(
    "/admin/order/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    deleteOrders
  );

export default router;
