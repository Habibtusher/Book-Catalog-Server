"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodValidation = void 0;
const zod_1 = require("zod");
const UserRegisterZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
const UserLoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.UserZodValidation = {
    UserRegisterZodSchema,
    UserLoginZodSchema
};
