import express from 'express';
import {registerUser, loginUser, get_current_user, logoutUser} from '../Controllers/authController.js';
import catchAsync from '../Utils/catchAsync.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.post("/signup", catchAsync(registerUser));
authRouter.post("/login", catchAsync(loginUser));
authRouter.get("/me", isAuthenticated, catchAsync(get_current_user));
authRouter.post("/logout", logoutUser)

export default authRouter;