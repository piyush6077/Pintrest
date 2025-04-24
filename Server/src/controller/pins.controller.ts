import asyncHandler from "../utils/asyncHandler"
import { Request, Response } from "express"
import { Pin } from "../model/pins.model"
import uploadOnCloudinary from "../utils/cloudinary"

export const createPin =  asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { title, description, image , link} = req.body
    const userId = req.user?._id as string

    if (!title || !description || !image && !link) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const file = (req.files as any)?.image[0]
    if(!file){
        return res.status(400).json({ message: "Image is required" })
    }

    const imageUrl = await uploadOnCloudinary(file.path)
    if(!imageUrl){
        return res.status(400).json({ message: "Error uploading image" })
    }

    const newPin = await Pin.create({ 
        title, 
        description, 
        image: imageUrl,
        userId 
    })

    return res.status(201).json({ message: "Pin created successfully", pin: newPin })
})

export const deletePin = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id:pinId } = req.params;
    const userId = req.user?._id as string

    const pin = await Pin.findById(pinId)
    if(!pin){
        return res.status(400).json({ message: "Pin not found" })
    }

    if(pin.userId.toString() !== userId.toString()){
        return res.status(400).json({ message: "You are not authorized to delete this pin" })
    }
    
    const deletePin = await Pin.findByIdAndDelete(pinId)
    if(!deletePin){
        return res.status(400).json({ message: "Error deleting pin" })
    }

    return res.status(200).json({ message: "Pin deleted successfully", pin: deletePin })
})

export const getPin = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id:pinId } = req.params;
    
    const pin = await Pin.findById(pinId).populate("userId", "-password")
    if(!pin){
        return res.status(400).json({ message: "Pin not found" })
    }

    pin.viewCount += 1
    await pin.save()

    return res.status(200).json({ message: "Pin fetched successfully", pin })
})


export const getAllPins = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const pins = await Pin.find().populate("userId", "-password")
    if(!pins){
        return res.status(400).json({ message: "Error fetching pins" })
    }

    return res.status(200).json({ message: "Pins fetched successfully", pins })
})