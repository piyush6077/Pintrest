import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { Notification } from "../model/notification.model";

export const getAllNotifications = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string

    const notifications = await Notification.find({ userId }).populate("pinId").sort({createdAt: -1}).lean()
    if (!notifications) {
        return res.status(404).json({ message: "No notifications found" })
    }

    return res.status(200).json({ message: "Notifications fetched successfully", notifications })
})

export const deleteNotification = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string
    const { id:notificationId } = req.params

    const deletedNotification = await Notification.findOneAndDelete({ _id: notificationId, userId })
    if (!deletedNotification) {
        return res.status(404).json({ message: "Notification not found" })
    }

    return res.status(200).json({ message: "Notification deleted successfully", deletedNotification })
})

export const deleteAllNotifications = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string

    const deletedNotifications = await Notification.deleteMany({ userId })
    if (!deletedNotifications) {
        return res.status(404).json({ message: "No notifications found" })
    }

    return res.status(200).json({ message: "All notifications deleted successfully", deletedNotifications })
})