import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserZodValidation } from './user.validation';
const router = express.Router();

router.post('/register',validateRequest(UserZodValidation.UserRegisterZodSchema), UserControllers.userRegister);
router.post('/login',validateRequest(UserZodValidation.UserLoginZodSchema), UserControllers.logIn);

export const UserRoutes = router;
