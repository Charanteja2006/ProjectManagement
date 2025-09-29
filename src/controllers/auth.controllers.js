import {User} from '../models/user.models.js';
import {ApiResponse} from '../utils/api-response.js';
import {ApiError} from '../utils/api-error.js';
import {asyncHandler} from '../utils/async-handler.js';
import {sendEmail,emailVerificationContent} from '../utils/mail.js';

const generateAccessAndRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken,refreshToken};

    } catch(error){
        throw new ApiError(500,"Something went wrong. Please try again.")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const {email,username,password} = req.body;

    const existedUser = await User.findOne({$or: [{email},{username}]})

    if(existedUser){
        throw new ApiError(401,"User with given email or username already exists.");
    }

    const user = await User.create({email,username,password,isEmailVerified: false});

    const {unHashedToken,hashedToken,tokenExpiry} = user.generateTemporaryToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    await user.save({validateBeforeSave: false});

    await sendEmail({
        email: user?.email,
        subject: "Verify your email",
        mailgenContent : emailVerificationContent(user?.username,`${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`)
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

    if(!createdUser){
        throw new ApiError(500,"Something went wrong. Please try again.")
    }

    return res
        .status(201)
        .json(new ApiResponse(201,{
            user: createdUser},
            "User registered successfully. Please check your email to verify your account."
    ));
})

export {registerUser};