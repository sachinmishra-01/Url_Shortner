import { createShortUrlWithUser, redirectFromShortUrl, getAllUrls } from '../Controllers/shortenUrlController.js';
import express from 'express';
import catchAsync from '../Utils/catchAsync.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';


const shortenUrlRouter = express.Router();


shortenUrlRouter.post("/create", isAuthenticated, catchAsync(createShortUrlWithUser));
shortenUrlRouter.post("/createWithoutUser", catchAsync(createShortUrlWithUser));
shortenUrlRouter.get("/user/urls", isAuthenticated, catchAsync(getAllUrls));
shortenUrlRouter.get("/:id", catchAsync(redirectFromShortUrl));


export default shortenUrlRouter;