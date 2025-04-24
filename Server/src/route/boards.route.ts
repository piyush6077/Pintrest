import express from 'express'
import { verifyJWT } from '../middleware/auth.middleware';
import { createBoard, deleteBoard, getAllBoards, getAllProfileBoards, getBoard } from '../controller/boards.controller';
const router = express.Router()

router.get("/boards", verifyJWT , getAllBoards)
router.get("/board/:id", verifyJWT, getBoard) 
router.get("/board/:username/boards", verifyJWT, getAllProfileBoards)
router.post("/create", verifyJWT , createBoard)
router.delete("/delete/:id", verifyJWT, deleteBoard)

export default router;