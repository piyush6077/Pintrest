import mongoose , {Document, Schema} from "mongoose"

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
  bio?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password:{
      type: String,
      required: true,
      trim: true,
    },
    name:{
      type: String,
      required: true
    },
    profilePicture:{
      type: String,
      default: "",
    },
    bio:{
      type: String,
      default: "",
    }  
  }, 
{timestamps: true})

export const User = mongoose.model<IUser>("User", userSchema)