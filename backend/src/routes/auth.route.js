import express from 'express';
import { register, signIn, signOut } from '../controllers/auth.controller.js';
import {upload} from '../middlewares/multer.middleware.js';



const authRouter = express.Router();

authRouter.route("/register").post(
    upload.single("userImage"),
    register);

authRouter.route("/sign-in").post(signIn)

authRouter.route("/sign-out").post(signOut)


export default authRouter;