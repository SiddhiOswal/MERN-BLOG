import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})


import express from "express";
const app = express();



import connectDB from './db/databaseCollection.js';
import authRouter from './routes/auth.route.js';

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