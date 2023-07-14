import httpStatus from 'http-status';
import ApiError from '../../../error/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const registerUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: { email: string; password: string }) => {
  const isExist = await User.isUserExist(payload.email);
  console.log('🚀 ~ file: user.service.ts:12 ~ loginUser ~ isExist:', isExist);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }
};
export const UserService = {
  registerUser,
  loginUser,
};
