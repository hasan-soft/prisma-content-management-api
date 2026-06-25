import {
  NextFunction,
  Request,
  RequestHandler,
  response,
  Response,
} from "express";
import { prisma } from "../../lib/prisma";
import httpStatus from "http-status";
import config from "../../config";
import bcrypt from "bcryptjs";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";

const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: { user },
    });
  },
);

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

   

    const profile = await userService.getMyProfileFromDB(req.user?.id as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:"User profile fetched successfully",
        data:{profile}
    })
  },
);

const updateMyProfile = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const userId = req.user?.id as string;

})


export const userController = {
  registerUser,
  getMyProfile,
  updateMyProfile
};
