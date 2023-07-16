"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = require("./book.model");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const books_const_1 = require("./books.const");
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const addNewBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(payload);
    return result;
});
const latestBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find().sort({ createdAt: -1 }).limit(10);
    return result;
});
const getAllBooks = (pagination, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(pagination);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            $or: books_const_1.bookssearchFields.map(field => ({
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
    const whereCondition = andCondition.length > 0
        ? {
            $and: andCondition,
        }
        : {};
    const sortOpt = {};
    if (sortBy && sortOrder) {
        sortOpt[sortBy] = sortOrder;
    }
    console.log('filter', filterData);
    const result = yield book_model_1.Book.find(whereCondition)
        .sort(sortOpt)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.Book.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const getsingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById({ _id: id });
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield book_model_1.Book.find({ _id: id });
    if (!existing) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, '');
    }
    const result = yield book_model_1.Book.findByIdAndDelete({ _id: id });
    return result;
});
const addReview = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.updateOne({ _id: id }, { $push: { reviews: review } });
    return result;
});
exports.BookService = {
    addNewBook,
    latestBooks,
    getAllBooks,
    updateBook,
    getsingleBook,
    deleteBook,
    addReview
};
