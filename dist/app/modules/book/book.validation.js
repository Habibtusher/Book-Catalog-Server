"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const addBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        author: zod_1.z.string({ required_error: 'Author is required' }),
        genre: zod_1.z.string({ required_error: 'Genre is required' }),
        publicationDate: zod_1.z.string({
            required_error: 'Publication date is required',
        }),
        publicationYear: zod_1.z.string({
            required_error: 'Publication year is required',
        }),
        addBy: zod_1.z.string({
            required_error: 'Add by date is required',
        }),
    }),
});
const editBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publicationDate: zod_1.z.string().optional(),
        publicationYear: zod_1.z.string().optional(),
        addBy: zod_1.z.string().optional(),
    }),
});
exports.BookValidation = {
    addBookZodSchema,
    editBookZodSchema
};
