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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.isUserExist(payload.email);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist!');
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(payload.password, isExist.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Wrong password!');
    }
    const value = {
        email: payload.email,
    };
    const accessToken = yield jsonwebtoken_1.default.sign(value, config_1.default.jwt_secret, {
        expiresIn: config_1.default.expires_in,
    });
    return {
        accessToken,
        email: payload.email
    };
});
exports.UserService = {
    registerUser,
    loginUser,
};
