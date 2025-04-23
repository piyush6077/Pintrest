import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { User } from '../model/user.model';
import uploadOnCloudinary from '../utils/cloudinary';

export const getProfile = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password").populate("profilePicture")
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export const updateProfileDetails = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    
    
        const { fullname, bio , username} = req.body;
        const userId = req.user?._id as string;

        if(!fullname && !bio && !username ) {
            return res.status(400).json({ message: "Please provide at least one fields to update" });
        }

        const updateFields: any = {};
        if (fullname) updateFields.fullname = fullname;
        if (bio) updateFields.bio = bio;
        if (username) updateFields.username = username;

        
        const updatedUser = await User.findByIdAndUpdate(userId, 
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select("-password")

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
});

export const updateProfilePicture = asyncHandler(async (req: Request, res: Response): Promise<any> => {
        const file = (req.files as any)?.profilePicture[0];
        const userId = req.user?._id;
        
        if(!file) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const imgURL = await uploadOnCloudinary(file.path)
        if(!imgURL) {
            return res.status(400).json({ message: "Error uploading image" });
        }

        const user = await User.findByIdAndUpdate(userId, {
            $set: {
                profilePicture: imgURL
            }
        }, { new: true }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile picture updated successfully", user });
});

export const checkUsernameAvailability = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username } = req.params;

    if(!username) {
        return res.status(400).json({ message: "Username is required" });
    }

    const existingUser = await User.findOne({ username });
    
    if(existingUser) {
        return res.status(200).json({ available: true , message: "Username is already taken" });
    } else {
        return res.status(200).json({ available: false , message: "Username is available" });
    }
});

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password").populate("profilePicture")
    if (!user){
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });    
});




