import express from 'express'
import { verifyJWT } from '../middleware/auth.middleware'
import { getProfile, updateProfilePicture } from '../controller/user.controller'
import { upload } from "../middleware/multer.middleware"
const router = express.Router()

router.get("/profile/:username", verifyJWT , getProfile)
router.post("/img", verifyJWT , upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    }
]) ,updateProfilePicture)


export default router