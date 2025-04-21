import mongoose , {Schema, Document} from "mongoose"

export interface ILike extends Document {
    userId: mongoose.Types.ObjectId;
    pinId: mongoose.Types.ObjectId;
}

const likeSchema: Schema<ILike> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        pinId: {
            type: Schema.Types.ObjectId,
            ref:"Pin",
            required:true
        }
    },{timestamps:true}
)

likeSchema.index({ userId: 1 , pinId: 1 }, { unique: true });

export const Like = mongoose.model<ILike>("Like", likeSchema)