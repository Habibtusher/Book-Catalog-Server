import { Schema, model } from 'mongoose';
import { IBook, BookModel } from './book.interface';

const BookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: String, required: true },
    publicationYear: { type: String, required: true },
    reviews: { type: Array<string> },
    addBy: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>('Book', BookSchema);
