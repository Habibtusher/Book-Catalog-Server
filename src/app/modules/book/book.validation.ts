import { z } from 'zod';

const addBookZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    author: z.string({ required_error: 'Author is required' }),
    genre: z.string({ required_error: 'Genre is required' }),
    publicationDate: z.string({
      required_error: 'Publication date is required',
    }),
    addBy: z.string({
      required_error: 'Add by date is required',
    }),
  }),
});
 export const BookValidation = {
    addBookZodSchema
 }