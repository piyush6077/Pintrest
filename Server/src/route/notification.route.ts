import express from "express";
import { verifyJWT } from "../middleware/auth.middleware";
const router = express.Router()

router.get("/notifications", verifyJWT, )
router.delete("/notifications", verifyJWT, )
router.delete("/notifications/:id", verifyJWT, )

export default router;