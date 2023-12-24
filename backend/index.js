// const app = require("./app");
import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import cloudinary from "cloudinary";

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to uncaught exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on ${process.env.PORT}`);
});

// Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log(err);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
