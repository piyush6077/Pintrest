import express from "express";
import { getCurrentUser, login, logout, signup } from "../controller/auth.controller";
import { verifyJWT } from "../middleware/auth.middleware";
const router = express.Router();

router.get("/getuser", verifyJWT, getCurrentUser)
router.post("/signup", signup)
router.post("/login", login);
router.post("/logout",verifyJWT, logout)


export default router;