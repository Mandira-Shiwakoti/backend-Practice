//this code deines the utility function which is used to simplify error handling in asynchronous Express route handlers 
//it is called the higher order function 

const asyncHandler =(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler}










// const asyncHandler =(fn)=>async(req,res,next) =>{
//     try {
//         await fn(req,res,next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }