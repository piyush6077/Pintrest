import mongoose , {Schema, Document} from "mongoose"

export interface INotification extends Document {
    type: string;
    content: string;
    receiverId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    isRead: boolean;
}

const notificationSchema: Schema<INotification> = new Schema(
    {
        type:{
            type: String,
            required: true,
            enum: ["like", "comment", "follow", "mention", "tag"],
        },
        content:{
            type: String,
            required: true,
            trim: true,
        },
        receiverId:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        senderId:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        isRead:{
            type: Boolean,
            default: false
        }
    },{timestamps:true}
)

export const Notification = mongoose.model<INotification>("Notification", notificationSchema)