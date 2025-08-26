import express from 'express';
import { createPost, deletePost, getAllPosts, getPostById } from '../controllers/post.controller.js';
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from '../middlewares/multer.middleware.js';

const postRouter = express.Router();

postRouter.route("/create-post").post(
    verifyJWT,
    upload.single("postImage"),
    createPost)


postRouter.route("/delete-post/:postId").delete(verifyJWT, deletePost)

postRouter.route("/get-posts").get(getAllPosts)

postRouter.route("/get-post/:postId").get(getPostById)


export default postRouter;