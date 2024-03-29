"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const handleCastError_1 = require("../../error/handleCastError");
const handleZodError_1 = __importDefault(require("../../error/handleZodError"));
const handleValidationError_1 = __importDefault(require("../../error/handleValidationError"));
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidatorError') {
        const simplefiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplefiedError.statusCode;
        message = simplefiedError.message;
        errorMessages = simplefiedError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplefiedError = (0, handleZodError_1.default)(err);
        statusCode = simplefiedError.statusCode;
        message = simplefiedError.message;
        errorMessages = simplefiedError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplefiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplefiedError.statusCode;
        message = simplefiedError.message;
        errorMessages = simplefiedError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
