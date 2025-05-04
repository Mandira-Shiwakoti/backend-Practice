import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema =new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String,//cloudinary url service is being used 
            required:true
        },
        coverImage:{
            type:String  //cloudinary url
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId, //refers to the unique _id of another document in the MongoDB
                ref:"Video"//Tells Mongoose this ObjectId refers to a document in the "Video" collection
            }
        ],
        password:{
            type:String,
            required:[true,'Password is required']
        },
        refreshToken:{
            type:String
        }

    },{
        timestamps:true
    }
)

//it is the mongoose middleware hook that runs before a user document is saved to the database 
//this refers to the user document being saved 

userSchema.pre("save", async function(next){ 
    if(!this.isModified("password")) return next(); //if the password has not been modified(eg:when updating only email),skip hashing and call next() immediately
    this.password= await bcrypt.hash(this.password,10)
    next()
})

//this custom method verifies whether the given password matches the user's hashed password stored in the database 
//userschema.methods is used to define the instance methods in Mongoose 
//password is the plain text provided by the user 
 userSchema.methods.isPasswordCorrect= async function(password){
      return await bcrypt.compare(password,this.password) //this.password is the hash password stored in the user document
}
userSchema.methods.generateAccessToken=function(){
     return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullname
        },
        // the secret key which is used to encrypt the token
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
           
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema)