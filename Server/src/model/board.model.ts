import mongoose , {Schema , Document} from "mongoose"

export interface IBoard extends Document { 
    title: string;
    isPrivate: boolean;
    userId: mongoose.Types.ObjectId;
    // coverImage: mongoose.Types.ObjectId;
}

const boardSchema: Schema<IBoard> = new Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true,
        },
        isPrivate:{
            type: Boolean,
            default: false
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        // coverImage:{
        //     type: Schema.Types.ObjectId,
        //     ref:"Pin",
        //     required:true
        // }
    }
    ,{timestamps:true}
)

export const Board = mongoose.model<IBoard>("Board", boardSchema)