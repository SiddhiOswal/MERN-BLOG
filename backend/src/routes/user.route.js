import express from 'express';
import { changePassword, updateDetails, updateUserImage, deleteUser} from "../controllers/user.controller.js"
import verifyJWT from '../middlewares/auth.middleware.js';
const userRouter = express.Router();


userRouter.route("/update-details").patch( verifyJWT, updateDetails)

userRouter.route("/change-password").post(verifyJWT, changePassword)

userRouter.route("/update-userImage").patch(updateUserImage)

userRouter.route("/delete-user").delete(verifyJWT, deleteUser)

export default userRouter;