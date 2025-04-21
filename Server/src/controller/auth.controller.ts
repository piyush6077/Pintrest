import asyncHandler from "../utils/asyncHandler";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/user.model";

export const signup = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { email, username, password, fullname } = req.body;

    if (!email || !username || !password || !fullname) {
        return res.status(400).json({
            message: "Please fill all the fields"
        });
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
        fullname
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
        return res.status(500).json({
            message: "User not created"
        });
    }

    return res.status(201).json({
        message: "User created successfully",
        createdUser
    });
});


export const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {

    const {email , password ,username} = req.body;
    if(!email && !username || !password){
        return res.status(400).json({
            message: "Please fill all the fields"
        });
    }

    const user = await User.findOne({
        $or: [{email}, {username}]
    })
    if(!user){
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }
    
    const verifyPassword = await bcrypt.compare(password, user.password);
    if(!verifyPassword){
        return res.status(400).json({
            message: "Invalid credentials"
        });
    }

    const loggedInUser = await User.findById(user._id).select("-password");
    if(!loggedInUser){
        return res.status(500).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        message: "User logged in successfully",
        loggedInUser
    });
    
})
