/* eslint-disable no-console */
import { ZodError, ZodIssue } from 'zod';
import { genericErrorResponse } from './common';
import { IGenericErrorMeaagae } from './error';

const handleZodError = (error: ZodError): genericErrorResponse => {
  console.log('error from', error);
  const errors: IGenericErrorMeaagae[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
