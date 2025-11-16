import express from "express";
import {
  registerContoller,
  loginController,
  logoutController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routes
// REGISTER
router.post("/register", registerContoller);

//LOGIN
router.post("/login", loginController);

//LOGOUT
router.post("/logout", logoutController);

export default router;
