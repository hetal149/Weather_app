import express from "express";
const router = express.Router();

import { signup, signin } from "../controllers/user.js";
import { SigninAuth, SignupAuth } from "../middleware/auth.js";


router.post("/login", SigninAuth, signin);
router.post("/register", SignupAuth, signup);
export default router;