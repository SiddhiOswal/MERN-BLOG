import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const isExistUser = await User.findOne({
            $or: [{ userName: userName.trim() }, { email: email.trim() }],
        });

        if (isExistUser) {
            throw new ApiError(400, "User already exists");
        }

        if (!validator.isEmail(email)) {
            throw new ApiError(400, "email invalid")
        }

        if (password.length < 6) {
            throw new ApiError(400, "Password must be greater than 6")
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const userImagePath = req.file?.path;

        if (!userImagePath) {
            throw new ApiError(400, "userImage file not found");
        }

        const userImage = await uploadOnCloudinary(userImagePath)

        if (!userImage) {
            throw new ApiError(400, "userImage not found on cloudinary")
        }

        const user = await User.create({
            userName: userName.trim(),
            email: email.trim(),
            userImage: userImage.url,
            password: hashedPassword
        })

        const createdUser = await User.findById(user._id).select(" -password ");

        if (!createdUser) {
            throw new ApiError(400, "User not created properly")
        }

        const savedUser = await createdUser.save();

        return res
            .status(201)
            .json(new ApiResponse(
                201,
                savedUser,
                "User created successfully"
            ))

    } catch (error) {
        throw new ApiError("something went wrong", error);
    }
};

const signIn = async (req, res) => {
    try {
        const {userName, email, password} = req.body;

        if(!userName || !email || !password){
            throw new ApiError(400, "All fields are mandatory")
        }

        if (!validator.isEmail(email)) {
            throw new ApiError(400, "email invalid")
        }

        const isExistUser = await User.findOne({ $or: [{ userName : userName.trim() }, {email : email.trim() }] });
        
        if(!isExistUser) {
            throw new ApiError(400, "User not found")
        }

        const comparePass = bcrypt.compareSync(password, isExistUser.password); 

        if(!comparePass) {
            throw new ApiError(400, "Invalid password")
        }

        const token = jwt.sign({ id: isExistUser._id }, process.env.ACCESS_TOKEN_SECRET);

        if(!token){
            throw new ApiError(400, "token not found")
        }

        const loggedInUser = await User.findById(isExistUser._id).select(" -password");
    
        const options = {
            httpOnly: true,
            secure: false,
        };

        return res
        .status(200)
        .cookie("accessToken", token,options)
        .json(new ApiResponse(
            200,
            {
                loggedInUser,
                token
            },
            "User logged in successfullly"
        ))
    
    } catch (error) {
        throw new ApiError(400, error);
    }
};  

const signOut = async (req, res) => {
    //logic
}



export { register, signIn, signOut }