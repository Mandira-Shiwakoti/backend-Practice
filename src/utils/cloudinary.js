import { v2 as cloudinary} from "cloudinary";

import fs from 'fs';  //it stands for the file system and it provides an API to interact with the file system on your computer or server 

// Configuration
 cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

      //creating the method to handle the upload of the files system in the cloudinary 
    const uploadOnCloudinary =async(localFilePath)=>{
        try {
            if(!localFilePath) return null
            //upload the file on the cloudinary
             const response= await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            //file has been uploaded successfully
            console.log("file is uploaded on cloudinary",response.url);
            return response;
        } catch (error) {
            fs.unlinkSync(localFilePath)  //remove the locally saved temporary file as the upload operation got failed
            return null;
        }
    }

    export {uploadOnCloudinary}



