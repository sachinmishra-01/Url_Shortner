import express from "express";
import dotenv from "dotenv";
import mongoConnect from "./src/config/mongo.config.js";
import shortenUrlRouter from "./src/Routers/shortenUrlRouter.js";
import authRouter from "./src/Routers/authRouter.js";
import { errorHandler } from "./src/Utils/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config({
    path: "./.env"
});


const app = express();

// Connect to MongoDB
mongoConnect();

app.use(cors({
  origin: "http://localhost:5173", // or your frontend origin
  credentials: true               // 🔴 Required to send cookies
}));
app.use(cookieParser());
// These two lines middlewares used to parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", authRouter);
app.use("/api", shortenUrlRouter);
app.use("/", shortenUrlRouter);
app.use(errorHandler)

app.listen(5000, () => {
    console.log("App listening on http://localhost:5000");
})
