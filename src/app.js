import express from 'express' //import the express frmaework which is used to build the web server and API
import cors from 'cors' //import the CORS middleware which 
import cookieParser from 'cookie-parser';//a middleware that parses cookies

const app =express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true //allows the server to accept the cookies,authorization headers etc  from the client 
}));

app.use(express.json({  //parses the incoming JSON request bodies
    limit:"16kb" //limits the size of the JSON to 16 kb to prevent the large file submission 
}))
app.use(express.urlencoded({extended:true,limit:"16kb"})) //parses application/x-www-form-urlencoded payloads like html form submission or  parses incoming requests with URL-encoded payloads—typically from HTML form submissions—and makes the data available under req.body. 
app.use(express.static("public")) //serves the static files(like images,css,js) from the public directory
app.use(cookieParser()) //parses cookies attached to the client request 

//routes

import userRouter from './routes/user.routes.js'//import the user router,which contains user-related API endpoints(like login,register,profile)etc.



//routes declaration 

app.use("/api/v1/users",userRouter)

export { app }

//summary 
//sets up a secure and structured Express server 
//adds essential middleware for JSON,cookies,CORS,forms,and the static files 
//organizes routes under /api/v1/users
//prepares the app for export and use in the main server file 