import { Like } from "../model/like.model"
import asyncHandler from "../utils/asyncHandler"
import { Request, Response } from "express"

export const likePin = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string
    const { pinId } = req.params

    const existing = await Like.findOne({ pinId , userId })
    if (existing) {
        return res.status(400).json({ message: "Pin already liked" })
    }

    const like = await Like.create({
        pinId,
        userId
    })
    
    return res.status(200).json({ message: "Pin liked" , like })
})

export const unlikePin = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string
    const { pinId } = req.params

    const deleted = await Like.findOneAndDelete({ pinId , userId })
    if (!deleted) {
        return res.status(400).json({ message: "Pin not liked" })
    }

    return res.status(200).json({ message: "Pin unliked" })
})

export const getAllLikedPins = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string

    const likedPins = await Like.find({ userId }).populate("pinId").lean()
    if (!likedPins) {
        return res.status(404).json({ message: "No liked pins found" })
    }

    return res.status(200).json({ message: "Liked pins fetched", likedPins })
})

export const getLikeCount = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { pinId } = req.params

    const count = await Like.countDocuments({ pinId })
    if (count === 0) {
        return res.status(404).json({ message: "No likes found" })
    }

    return res.status(200).json({ message: "Like count fetched", count })
})

export const isLiked = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string
    const { pinId } = req.params

    const liked = await Like.findOne({ pinId , userId })
    if (!liked) {
        return res.status(404).json({ message: "Pin not liked" })
    }

    return res.status(200).json({ message: "Pin liked", liked })
})

export const getUserWhoLiked = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { pinId } = req.params

    const users = await Like.find({ pinId }).populate("userId")
    if (!users) {
        return res.status(404).json({ message: "No users found" })
    }

    return res.status(200).json({ message: "Users who liked the pin", users })
})
