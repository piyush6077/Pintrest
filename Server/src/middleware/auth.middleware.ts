import asyncHandler from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model";
import { IUser } from "../model/user.model";

interface JwtPayload {
    _id: string;
}

declare global {
    namespace Express {
      interface Request {
        user?: IUser;
      }
    }
}

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Token" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        const user = await User.findById(decoded._id).select("-password") as IUser;
        if(!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
})