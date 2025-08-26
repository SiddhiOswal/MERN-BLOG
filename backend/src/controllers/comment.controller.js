import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Comment from "../models/comment.model.js";


const createComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;

        if (!postId || !content || !userId) {
            throw new ApiError(400, "All fields are required");
        }

        const newComment  = await Comment.create({
            content,    
            userId,
            postId,
        });


        return res.status(201).json(new ApiResponse(201, newComment, "Comment created successfully"));
    } catch (error) {
        throw new ApiError(400, error.message);
    }
}


const specificPostComment = async (req, res) => {
  try {
    const { postId } = req.params; 

    if (!postId) {
      throw new ApiError(400, "Post ID is required");
    }

    const comments = await Comment.find({ postId });

    if (!comments) {
      throw new ApiError(404, "No comments found for this post");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, comments, "Comments fetched successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};


const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body; 

    if (!commentId) {
      throw new ApiError(400, "Comment ID is required");
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      throw new ApiError(404, "Comment not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Comment deleted successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};


export { createComment, specificPostComment, deleteComment };