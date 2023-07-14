import mongoose from 'mongoose';
import { genericErrorResponse } from '../interface/common';
import { IGenericErrorMeaagae } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): genericErrorResponse => {
  const errors: IGenericErrorMeaagae[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleValidationError;
