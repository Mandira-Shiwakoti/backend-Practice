import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const VideoSchema =new Schema(
    {
        videoFile:{
            type:String,  //cloudinary url
            required:true

        },
        thumbnail:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,  //cloudinary 
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        Owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }

      
    },
    {
        timestamps:true
    }
)


//plugins can help to add the new methods,helpers,schemas, middleware
VideoSchema.plugin(mongooseAggregatePaginate)  //this is the pagination plugin specifically made to work with aggregation pipelines

export const Video= mongoose.model("Video",VideoSchema)