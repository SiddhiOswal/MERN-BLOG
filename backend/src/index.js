import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})


import express from "express";
import cookieParser from "cookie-parser"
const app = express();
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



import connectDB from './db/databaseCollection.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';


//connection logic
connectDB()
    .then(()=>{
        app.listen(process.env.PORT, () => {
        console.log("server running on port",process.env.PORT);
    });
  })
  .catch((error)=> {
    console.log("server connection failed",error);
  });



  //app.use is used for middleware as well as to pass routes
  //routes
  app.use("/api/auth",authRouter);
  app.use("/api/user", userRouter);