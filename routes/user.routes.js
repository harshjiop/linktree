import express from "express";
import {
  home,
  register,
  login,
  logout,
  myprofile,
} from "../Controlles/user.controlles.js";
import jwtAuth from "../middleware/tokenverify.middleware.js"

const router = express.Router();
router.get("/", home);
router.post("/register", register);
router.post("/login", login);
router.get("/logout",jwtAuth, logout);
router.get("/myprofile",jwtAuth, myprofile);

export default router;
