import express from 'express'
import { verifyJWT } from '../middleware/auth.middleware'
import { createPin, deletePin, getAllPins, getPin } from '../controller/pins.controller'
import { upload } from '../middleware/multer.middleware'
const router = express.Router()

router.get("/pins", verifyJWT, getAllPins)
router.get("/pin/:id", verifyJWT )
router.post( "/create" , verifyJWT , upload.fields([
        { name: "image", maxCount: 1 }
    ]) , createPin)
router.delete("/delete/:id", verifyJWT, deletePin)

export default router