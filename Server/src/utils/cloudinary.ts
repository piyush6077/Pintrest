import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({ 
    cloud_name: 'dfssiean3', 
    api_key: '559857293952612', 
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
    try {
        if(!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        })
        console.log('File uploaded to successfully on cloudinary : ', response.url)
        fs.unlinkSync(localFilePath)
        return response.secure_url
    } catch (error) {
        console.log(error)
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }

        return null
    }
}

export default uploadOnCloudinary