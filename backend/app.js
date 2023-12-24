// const express = require("express");
import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoutes.js";
import paymentRoute from "./routes/paymentRoute.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middleware/error.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(fileUpload());
app.use(cookieParser());
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

const __fileanme = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileanme);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for error
app.use(errorMiddleware);

export default app;

// body-parser deprecated undefined extended: provide extended option file
