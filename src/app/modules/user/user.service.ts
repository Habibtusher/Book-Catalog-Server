import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import config from '../../../config';
import jwt, { Secret } from 'jsonwebtoken';
const registerUser = async (payload: IUser): Promise<IUser> => {
  
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: { email: string; password: string }) => {
  const isExist = await User.isUserExist(payload.email);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    isExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Wrong password!');
  }
  const value = {
    email: payload.email,
  };
  const accessToken = await jwt.sign(value, config.jwt_secret as Secret, {
    expiresIn: config.expires_in,
  });
  return {
    accessToken,
    email:payload.email
  };
};
export const UserService = {
  registerUser,
  loginUser,
};
