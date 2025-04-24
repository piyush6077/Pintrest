import express from "express"
import { verifyJWT } from "../middleware/auth.middleware";
import { addComment, deleteComment, getAllComments, getCommentCount } from "../controller/comment.controller";
const router = express.Router()

router.get("/comments/:pinId", verifyJWT , getAllComments)
router.get("/comments/:pinId/count", verifyJWT , getCommentCount)
router.post("/comments/:pinId", verifyJWT, addComment)
router.delete("/comments/:pinId", verifyJWT , deleteComment)

export default router;