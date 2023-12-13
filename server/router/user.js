import express from "express";
const router = express.Router();

import { authUser, registerUser, logoutUser } from "../controllers/user.js";
import { protect } from "../middleware/auth.js";

router.post("/register", registerUser);

router.get("/auth/:username", authUser);

router.get("/logout", protect, logoutUser);

export default router;
