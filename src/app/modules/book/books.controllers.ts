import { Request, Response } from 'express';
import catchasync from '../../../shared/catchAsync';
import { BookService } from './books.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { booksFilters } from './books.const';
import { IBook } from './book.interface';

const addNewBook = catchasync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await BookService.addNewBook(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully added new book',
    data: result,
  });
});
const latestBooks = catchasync(async (req: Request, res: Response) => {
  const result = await BookService.latestBooks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrived successfully',
    data: result,
  });
});
const allBooks = catchasync(async (req: Request, res: Response) => {
  const pagination = pick(req.query, paginationFields);
  const filterData = pick(req.query, booksFilters);
  const result = await BookService.getAllBooks(pagination, filterData);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrived successfully!',
    data: result.data,
    meta: result.meta,
  });
});
const updateBook = catchasync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...updateedData } = req.body;
  const result = await BookService.updateBook(id, updateedData);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books updated successfully!',
    data: result,
  });
});

export const BookController = {
  addNewBook,
  latestBooks,
  allBooks,
  updateBook,
};
