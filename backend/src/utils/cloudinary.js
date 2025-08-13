import {v2 as cloudinary} from 'cloudinary'
import fs from "fs";

import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async(localFilePath) => {
    try{
        if(!localFilePath) return null;
          
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",    
            });

            console.log("file uploaded successfully", response.url)

            if(fs.existsSync(localFilePath)){
                fs.rmSync(localFilePath);
            }
            return response;
    } catch(error) {
        console.log("error occur while uploading on cloudinary",error);
        
        if(fs.existsSync(localFilePath)){
            fs.rmSync(localFilePath);
        }

        return  null;
    }
};

export {uploadOnCloudinary};