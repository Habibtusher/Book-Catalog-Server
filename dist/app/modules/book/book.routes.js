"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const books_controllers_1 = require("./books.controllers");
const router = express_1.default.Router();
router.post('/add-new-book', (0, validateRequest_1.default)(book_validation_1.BookValidation.addBookZodSchema), books_controllers_1.BookController.addNewBook);
router.patch('/edit-book/:id', (0, validateRequest_1.default)(book_validation_1.BookValidation.editBookZodSchema), books_controllers_1.BookController.updateBook);
router.post('/add-review/:id', books_controllers_1.BookController.addReview);
router.get('/latest-books', books_controllers_1.BookController.latestBooks);
router.get('/', books_controllers_1.BookController.allBooks);
router.get('/:id', books_controllers_1.BookController.getsingleBook);
router.delete('/:id', books_controllers_1.BookController.deleteBook);
exports.BookRoutes = router;
