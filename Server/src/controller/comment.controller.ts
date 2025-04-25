import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { Comment } from "../model/comment.model";
import { Pin } from "../model/pins.model";
import { Notification } from "../model/notification.model";
import { User } from "../model/user.model";


export const addComment = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string
    const { pinId } = req.params
    const { comment } = req.body

    const pin = await Pin.findById(pinId)
    if (!pin) {
        return res.status(404).json({ message: "Pin not found" })
    }

    const newComment = await Comment.create({
        pinId,
        userId,
        comment
    })

    if (!newComment) {
        return res.status(400).json({ message: "Failed to add comment" })
    }


    const user = await User.findById(userId).select("username").lean()
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    //Todo:create Notification
    if(pin.userId.toString() !== userId) {
        await Notification.create({
            type: "comment",
            senderId: userId,
            receiverId: pin.userId.toString(),
            content: `${user.username} commented on your pin`,
        })
    }

    
    return res.status(200).json({ message: "Comment added successfully", newComment })
})

export const deleteComment = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string
    const { commentId } = req.params

    const comment = await Comment.findById(commentId)
    if (!comment) {
        return res.status(404).json({ message: "Comment not found" })
    }

    if (comment.userId.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized" })
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId)
    if (!deletedComment) {
        return res.status(400).json({ message: "Failed to delete comment" })
    }

    return res.status(200).json({ message: "Comment deleted successfully", deletedComment })
})

export const getAllComments = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { pinId } = req.params

    const comments = await Comment.find({ pinId }).populate("userId", "name").lean()
    if (comments.length === 0) {
        return res.status(200).json({ message: "No comments found" , comments : []})
    }

    return res.status(200).json({ message: "Comments fetched successfully", comments })
})

export const getCommentCount = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { pinId } = req.params

    const count = await Comment.countDocuments({ pinId }) 
    if (count === 0) {
        return res.status(200).json({ message: "No comments found", count: 0 })
    }

    return res.status(200).json({ message: "Comment count fetched successfully", count })
})

