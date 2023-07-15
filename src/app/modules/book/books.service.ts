import { SortOrder } from 'mongoose';
import { IBook, IBooksFilters } from './book.interface';
import { Book } from './book.model';
import { calculatePagination } from '../../../helper/paginationHelper';
import { IPaginatioOpts } from '../../../interface/pagination';
import { bookssearchFields } from './books.const';
import { IGenericResponse } from '../../../interface/common';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const addNewBook = async (payload: IBook): Promise<IBook> => {
  const result = await Book.create(payload);
  return result;
};
const latestBooks = async (): Promise<IBook[] | null> => {
  const result = await Book.find().sort({ createdAt: -1 }).limit(10);
  return result;
};
const getAllBooks = async (
  pagination: IPaginatioOpts,
  filters: IBooksFilters
): Promise<IGenericResponse<IBook[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(pagination);
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: bookssearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([fields, value]) => ({
        [fields]: value,
      })),
    });
  }
  const whereCondition =
    andCondition.length > 0
      ? {
          $and: andCondition,
        }
      : {};
  const sortOpt: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortOpt[sortBy] = sortOrder;
  }
  console.log('filter', filterData);
  const result = await Book.find(whereCondition)
    .sort(sortOpt)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const updateBook = async (
  id: string,
  payload: Partial<IBook>
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const getsingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findById({ _id: id });
  return result;
};
const deleteBook = async (id: string): Promise<IBook | null> => {
  const existing = await Book.find({ _id: id });
  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, '');
  }
  const result = await Book.findByIdAndDelete({ _id: id });
  return result;
};
const addReview = async (id: string, review: string) => {
  const result = await Book.updateOne(
    { _id: id },
    { $push: { reviews: review } }
  );
  return result;
};
export const BookService = {
  addNewBook,
  latestBooks,
  getAllBooks,
  updateBook,
  getsingleBook,
  deleteBook,
  addReview
};
