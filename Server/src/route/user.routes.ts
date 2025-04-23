import express from 'express'
import { verifyJWT } from '../middleware/auth.middleware'
import { checkUsernameAvailability, getProfile,updateProfileDetails, updateProfilePicture } from '../controller/user.controller'
import { upload } from "../middleware/multer.middleware"
const router = express.Router()

router.get("/profile/:username", verifyJWT , getProfile)
router.get("/check-username/:username", verifyJWT , checkUsernameAvailability)
router.get("/getUser/:id" , verifyJWT , getProfile)
router.put("/updateImg", verifyJWT , upload.fields([
    {
        name: "profilePicture",
        maxCount: 1
    }
]) ,updateProfilePicture)
router.put("/updateProfile", verifyJWT , updateProfileDetails)


export default router