import express from 'express';
import { getAllPinInBoard, savePinToBoard } from '../controller/pinBoard.controller';
import { verifyJWT } from '../middleware/auth.middleware';
const router = express.Router()

router.get("/:boardId", verifyJWT, getAllPinInBoard)
router.post("/:boardId/:pinId",verifyJWT, savePinToBoard)
router.delete("/:boardId/:pinId")

export default router;
