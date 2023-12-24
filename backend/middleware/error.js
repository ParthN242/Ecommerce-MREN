// const ErrorHandler = require("../utils/errorhander");
import ErrorHandler from "../utils/errorhandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // Wrong mongodb id
  if (err.name === "CastError") {
    const message = `Resource not found. Invaild: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Token
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token Invaild, try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
