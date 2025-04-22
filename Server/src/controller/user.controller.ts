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

// export const updateProfile = asyncHandler(async (req: Request, res: Response): Promise<any> => {
//     const { fullname, bio } = req.body;
    
//     if(fullname && bio && username ) {

//     }
// });


export const updateProfilePicture = asyncHandler(async (req: Request, res: Response): Promise<any> => {

    try {
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

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error"});
    }
});


