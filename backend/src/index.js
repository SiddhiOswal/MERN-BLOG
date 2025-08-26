import dotenv from 'dotenv';
import cors from "cors";
dotenv.config({
  path: './.env'
})


import express from "express";
import cookieParser from "cookie-parser"
const app = express();




app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//cors policy
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);



import connectDB from './db/databaseCollection.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';

//connection logic
connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("server connection failed", error);
  });



//app.use is used for middleware as well as to pass routes
//routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);