import mongoose from 'mongoose';
import { IGenericErrorMeaagae } from '../interface/error';

export const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: IGenericErrorMeaagae[] = [
    { path: err.path, message: 'Invalid Id' },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};
