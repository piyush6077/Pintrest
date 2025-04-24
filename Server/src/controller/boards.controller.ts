import { Board } from "../model/board.model"
import { User } from "../model/user.model"
import asyncHandler from "../utils/asyncHandler"
import { Request, Response } from "express"

export const createBoard = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { title , isPrivate} = req.body
    const userId = req.user?._id as string

    if (!title) {
        return res.status(400).json({ message: "Title is required" })
    }

    const existingBoard = await Board.findOne({ title , userId})
    if (existingBoard) {
        return res.status(400).json({ message: "Board with this title already exists" })
    }

    const newBoard = await Board.create({ 
        title, 
        isPrivate: isPrivate ?? false,
        userId 
    })
    if (!newBoard) {
        return res.status(400).json({ message: "Error creating board" })
    }

    return res.status(201).json({ message: "Board created successfully", board: newBoard })
})

export const deleteBoard = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id:boardId } = req.params;
    const userId = req.user?._id as string

    const board = await Board.findById(boardId)
    if(!board){
        return res.status(400).json({ message: "Board not found" })
    }

    if(board.userId.toString() !== userId.toString()){
        return res.status(400).json({ message: "You are not authorized to delete this board" })
    }
    
    const deleteBoard = await Board.findByIdAndDelete(boardId)
    if(!deleteBoard){
        return res.status(400).json({ message: "Error deleting board" })
    }

    return res.status(200).json({ message: "Board deleted successfully", board: deleteBoard })
})

export const getBoard = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { id:boardId } = req.params;
    
    const board = await Board.findById(boardId).populate("userId", "-password")
    if(!board){
        return res.status(400).json({ message: "Board not found" })
    }

    return res.status(200).json({ message: "Board fetched successfully", board })
})

export const getAllBoards = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const userId = req.user?._id as string

    const boards = await Board.find({ userId }).populate("userId", "-password")
    if(!boards){
        return res.status(400).json({ message: "Error fetching boards" })
    }

    return res.status(200).json({ message: "Boards fetched successfully", boards })
})

export const getAllProfileBoards = asyncHandler(async (req: Request, res: Response): Promise<any> => {
    const { username } = req.params;
    
    const user = await User.findOne({ username }).select("_id").lean()
    if(!user) {
        return res.status(400).json({ message: "User not found" })
    }

    const boards = await Board.find({ 
        userId: user?._id,
        isPrivate: false 
    }).populate("userId", "-password")
    if(!boards){
        return res.status(400).json({ message: "Error fetching boards" })
    }

    return res.status(200).json({ message: "Boards fetched successfully", boards })
})