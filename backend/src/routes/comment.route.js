import express from 'express';
import { createComment ,  specificPostComment, deleteComment} from '../controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.route("/create-comment").post(createComment);

commentRouter.route("/get-post-comments/:postId").get(specificPostComment);

commentRouter.route("/delete-comment").delete(deleteComment)

export default commentRouter;