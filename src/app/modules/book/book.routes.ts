import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './books.controllers';

const router = express.Router();

router.post(
  '/add-new-book',
  validateRequest(BookValidation.addBookZodSchema),
  BookController.addNewBook
);
router.patch(
  '/edit-book/:id',
  validateRequest(BookValidation.editBookZodSchema),
  BookController.updateBook
);
router.post('/add-review/:id', BookController.addReview);
router.get('/latest-books', BookController.latestBooks);
router.get('/', BookController.allBooks);
router.get('/:id', BookController.getsingleBook);
router.delete('/:id', BookController.deleteBook);

export const BookRoutes = router;
