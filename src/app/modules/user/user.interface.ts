import { Model } from "mongoose";

export type IUser = {
  email: string;
  password: string;
};

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<IUser>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>