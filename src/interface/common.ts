import { IGenericErrorMeaagae } from './error';
export type genericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMeaagae[];
};

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
