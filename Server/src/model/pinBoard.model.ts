import mongoose,{Schema, Document} from "mongoose";

export interface IPinBoard extends Document {
    pinId: mongoose.Types.ObjectId;
    boardId: mongoose.Types.ObjectId;
}

const pinBoardSchema: Schema<IPinBoard> = new Schema(
    {
        pinId:{
            type: Schema.Types.ObjectId,
            ref:"Pin",
            required:true
        },
        boardId:{
            type: Schema.Types.ObjectId,
            ref:"Board",
            required:true
        }
    },{timestamps:true}
)

pinBoardSchema.index({pinId: 1, boardId: 1}, {unique: true});

export const PinBoard = mongoose.model<IPinBoard>("PinBoard", pinBoardSchema);