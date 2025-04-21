import mongoose, {Schema, Document } from "mongoose"

export interface IPin extends Document{
    title?: string;
    description?: string;
    image: string;
    link?: string;
    viewCount: number;
    userId: mongoose.Types.ObjectId;
}

const pinSchema: Schema<IPin> = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        description:{
            type: String,
            // required: true,
            trim: true,
        },
        image:{
            type: String,
            required: true,
            trim: true,
        },
        link:{
            type: String,
            // required: true,
            trim: true,
        },
        viewCount:{
            type: Number,
            default: 0
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    }, 
    {timestamps:true}
)

export const Pin = mongoose.model<IPin>("Pin", pinSchema)