// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from'./app.js';
// const app=express();

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    //starts the express server on the port defined in .env or the default to 8000
    app.listen(process.env.PORT || 8000, () => {
      console.log(` Server is running at port ${process.env.PORT}`);
    });
    //listens for any errors that occur in the express app after starting
    app.on("error", (error) => {
      console.log("ERR:", error);
      throw error;
    });
  })
  //if the database connection fails,this catches the error
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
