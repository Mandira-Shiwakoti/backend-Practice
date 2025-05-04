import multer from "multer";
 //storage is the configuration object for multer. It uses multer.diskStorage() to store the  files on the disk(your server's file system),not in the memory or cloud 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        //cb is the callback used to decide the folder path for storing the uploaded files
        cb(null,'./public/temp')
    },

    //this function decides the name of the file once saved on disk 
    filename:function(req,file,cb){
        
        cb(null,file.originalname)
    }
})

//this creates the multer instance with the storage settings above 
//we are exporting it as upload so it can be used in your routes 
export const upload=multer({
    storage,
})