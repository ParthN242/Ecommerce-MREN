import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  logOut,
  loginUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controller/userController.js";
import { authorizeRole, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/password/forgot", forgotPassword)
  .put("/password/reset/:token", resetPassword)
  .get("/logout", logOut)
  .get("/me", isAuthenticatedUser, getUserDetails)
  .put("/password/update", isAuthenticatedUser, updatePassword)
  .put("/me/update", isAuthenticatedUser, updateProfile)
  .get("/admin/users", isAuthenticatedUser, authorizeRole("admin"), getAllUsers)
  .get(
    "/admin/user/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    getSingleUser
  )
  .put(
    "/admin/user/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    updateUserRole
  )
  .delete(
    "/admin/user/:id",
    isAuthenticatedUser,
    authorizeRole("admin"),
    deleteUser
  );

export default router;
