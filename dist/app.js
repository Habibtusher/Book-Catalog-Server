"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
const index_1 = __importDefault(require("./app/routes/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', index_1.default);
// app.get('/', (res: Response) => {
//   res.send('Express + TypeScript Server');
//   // throw new ApiError(400,"Bad request")
// });
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'API Not Found!',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found!',
            },
        ],
    });
    next();
});
exports.default = app;
