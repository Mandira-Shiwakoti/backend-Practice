// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import express from 'express';

import connectDB from "./db/index.js";
const app=express();

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(` Server is running at port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("ERR:", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed !!!", err);
  });
  export default app

// import express from 'express'

// const app = express();

// (async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("ERR:",error);
//         throw error
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`App is lsitening on the port ${process.env.PORT}`);
//        })
//     } catch (error) {
//         console.error("ERROR:",error)
//         throw err
//     }
// })()
