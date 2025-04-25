import { Follow } from "../model/follow.model";
import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import { User } from "../model/user.model";
import { Notification } from "../model/notification.model";

export const follow = asyncHandler(async (req: Request, res: Response): Promise<any> => {

    const followerId = req.user?._id as string;
    const { followingId } = req.params

    if(!followingId || followerId === followingId) {
        return res.status(400).json({ message: "Invalid request" });
    }

    const existing = await Follow.findOne({ followerId , followingId})
    if(existing) {
        return res.status(400).json({ message: "Already following" });
    }

    const follow = await Follow.create({ followerId, followingId });
    if(!follow) {
        return res.status(400).json({ message: "Error following user" });
    }
    //Todo:create Notification
    const follower = await User.findById(followerId).select("username").lean();
    await Notification.create({
        type: "follow",
        senderId: followerId,
        receiverId: followingId,
        content: `${follower?.username} followed you`,
    })


    return res.status(200).json({ message: "User followed successfully", follow });
});


export const unFollow = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    
    const followerId = req.user?._id as string;
    const { followingId } = req.params

    const unFollow = await Follow.findOneAndDelete({ followerId, followingId });
    if(!unFollow) {
        return res.status(400).json({ message: "Error unfollowing user" });
    }
    //Todo:create Notification


    return res.status(200).json({ message: "User unfollowed successfully", unFollow });
});


export const getFollowers = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    
    const { username } = req.params;
    
    const userId = await User.findOne({ username }).select("_id").lean().exec();
    if(!userId) {
        return res.status(400).json({ message: "User not found" });
    }
    
    const followers = await Follow.find({ followingId: userId }).populate("followerId", "-password").select("-__v -createdAt -updatedAt");

    if(!followers) {
        return res.status(400).json({ message: "Error fetching followers" });
    }

    return res.status(200).json({ message: "Followers fetched successfully", followers });
});

export const getFollowersCount = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        
    const { username } = req.params;
    
    const userId = await User.findOne({ username }).select("_id").lean().exec();
    if(!userId) {
        return res.status(400).json({ message: "User not found" });
    }
    
    const followersCount = await Follow.countDocuments({ followingId: userId });

    if(followersCount === undefined) {
        return res.status(400).json({ message: "Error fetching followers count" });
    }
    
    return res.status(200).json({ message: "Followers count fetched successfully", followersCount });
})

export const getFollowingCount = asyncHandler(async (req: Request, res: Response): Promise<any> => {
            
    const { username } = req.params;
    
    const userId = await User.findOne({ username }).select("_id").lean().exec();
    if(!userId) {
        return res.status(400).json({ message: "User not found" });
    }

    const followingCount = await Follow.countDocuments({ followerId: userId });

    if(followingCount === undefined) {
        return res.status(400).json({ message: "Error fetching following count" });
    }

    return res.status(200).json({ message: "Following count fetched successfully", followingCount });
})

export const checkFollowing = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        
        const followerId = req.user?._id as string;
        const { followingId } = req.params
    
        if(!followingId) {
            return res.status(400).json({ message: "Invalid request" });
        }
    
        const isFollowing = await Follow.findOne({ followerId, followingId });
    
        if(isFollowing) {
            return res.status(200).json({ message: "User is following", isFollowing: true });
        } else {
            return res.status(200).json({ message: "User is not following", isFollowing: false });
        }
})







