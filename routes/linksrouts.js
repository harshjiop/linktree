import express from "express";
import {
  Getmyalllink,
  addlink,
  createlink,
  home,
} from "../Controlles/link.controlles.js";
import jwtAuth from "../middleware/tokenverify.middleware.js";

const router = express.Router();
router.route("/").get(home);
router.route("/addlink").post(jwtAuth, createlink);
router.route("/:author").post(jwtAuth,addlink);

export default router;
