"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserZodValidation.UserRegisterZodSchema), user_controller_1.UserControllers.userRegister);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserZodValidation.UserLoginZodSchema), user_controller_1.UserControllers.logIn);
exports.UserRoutes = router;
