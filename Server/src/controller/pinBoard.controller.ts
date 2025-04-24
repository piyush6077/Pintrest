import { Board } from "../model/board.model";
import { PinBoard } from "../model/pinBoard.model";
import { Pin } from "../model/pins.model";
import asyncHandler from "../utils/asyncHandler";
import { Request , Response } from "express";

export const savePinToBoard = asyncHandler(async(req: Request , res: Response ): Promise<any> => {
    const userId = req.user?._id as string
    const { boardId } =  req.params
    const { pinId } =  req.body

    const board = await Board.findById(boardId)
    const pin = await Pin.findById(pinId)

    if(!board || !pin){
        return res.status(400).json({message: "Board or pin not found"})
    }

    if(board.userId.toString() !== userId.toString()){
        return res.status(403).json({message: "UnAuthorized"})
    }

    const existing = await PinBoard.findOne({boardId , pinId})
    if(existing){
        return res.status(400).json({message: "Pin already exists in the board"})
    }

    const saved = await PinBoard.create({
        pinId,
        boardId,
        userId
    })

    return res.status(200).json({message: "Pin saved to the board" , saved})
})  


export const removePinFromBoard = asyncHandler(async(req: Request , res: Response ): Promise<any> => {
    const userId = req.user?._id as string 
    const { boardId , pinId} = req.params 

    const deleted = await PinBoard.findOneAndDelete({
        boardId,
        pinId,
        userId
    })
    if(!deleted){
        return res.status(400).json("Pin not found in the board")
    }

    return res.status(200).json({message: "Pin removed from board"})
})

export const getAllPinInBoard = asyncHandler(async(req: Request , res: Response ): Promise<any> => {
    const userId = req.user?._id as string  
    const { boardId } = req.params 

    const board = await Board.findById(boardId)
    if(!board){
        return res.status(404).json({message: "Board not found"})
    }

    if(board.isPrivate && board.userId.toString() !== userId.toString()){
        return res.status(403).json({message: "UnAuthorized"})
    }

    const pins = await PinBoard.find({boardId}).populate("pinId").populate("boardId").populate("userId").lean()
    if(pins.length === 0){
        return res.status(404).json({message: "No pin found in the board"})
    }
    return res.status(200).json({message: "Pins fetched successfully" , pins})
})
 