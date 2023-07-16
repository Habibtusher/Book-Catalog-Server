import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const logIn = catchasync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful.',
    data: result
  });
});
const userRegister = catchasync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;

  const result = await UserService.registerUser(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
export const UserControllers = {
  logIn,
  userRegister,
};
