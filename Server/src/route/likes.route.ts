import express from 'express'
const router = express.Router()
import { verifyJWT } from '../middleware/auth.middleware'
import { getAllLikedPins, getLikeCount, getUserWhoLiked, isLiked, likePin, unlikePin } from '../controller/likes.controller';

router.get("/" , verifyJWT , getAllLikedPins)
router.get("/count/:pinId", verifyJWT , getLikeCount)
router.get("/user/:pinId", verifyJWT , getUserWhoLiked)
router.get("/hasLiked/:pinId", verifyJWT , isLiked)
router.post("/:pinId", verifyJWT , likePin)
router.delete("/:pinId", verifyJWT , unlikePin)


export default router;