import mongoose , {Document, Schema} from "mongoose"
import jwt from 'jsonwebtoken'

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  fullname: string;
  profilePicture?: string;
  bio?: string;
  generateJsonWebToken: () => string;
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
    fullname:{
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


userSchema.methods.generateJsonWebToken = function (this: IUser) {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    } 
  )
}

export const User = mongoose.model<IUser>("User", userSchema)