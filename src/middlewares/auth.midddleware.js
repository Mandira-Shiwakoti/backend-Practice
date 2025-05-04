import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

//this defines and exports a middleware function called the verifyJWT 
export const verifyJWT=asyncHandler(async(req,_,next)=>{
   try {
    const token= req.cookies?.accessToken  || req.header
     ("Authorization")?.replace("Bearer ","")
     //this code attempts to get the cookies from the two places 
 

     //if the token is not found then it throws the API error
     if(!token){
         throw new ApiError(401,"Unauthorized request")
     }
 
     //this is used to decode and validate the JWT using your secret key 
     const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)


      //lookup the user in the databse using the _id extracted from the token 
    const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
 
    if(!user){
     //TODO:discuss about the frontend 
     throw new ApiError(401,"Invalid Access Token")
    }

    //attaches the verified user object to the req.user so it's accessible in the next middleware
    req.user=user;
    next()
   } catch (error) {
    throw new ApiError(401,error?.message || "Invalid Access Token")
   }
    
})