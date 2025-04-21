import mongoose , {Schema, Document} from "mongoose"

//TODO: include tag functionality latter
export interface IComment extends Document {
    content: string;
    pinId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema(
    {
        content:{
            type: String,
            required: true,
            trim: true,
        },
        pinId:{
            type: Schema.Types.ObjectId,
            ref:"Pin",
            required:true
        },
        userId:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },{timestamps:true}
)

export const Comment = mongoose.model<IComment>("Comment", commentSchema)