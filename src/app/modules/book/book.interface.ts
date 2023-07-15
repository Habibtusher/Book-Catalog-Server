import { Model } from 'mongoose';

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  publicationYear: string;
  reviews?: Array<string>;
  addBy: string;

};

export type IBooksFilters = {
    searchTerm?: string;
    title?: string;
  };
export type BookModel = Model<IBook>;
