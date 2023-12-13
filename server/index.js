import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db.js";
import userRoutes from "./router/user.js";
import postRoutes from "./router/post.js";
dotenv.config();

// app instance
const app = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// database connection
connectToDatabase();

// origin configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// sample route
app.get("/", (req, res) => {
  return res.send("Server is working");
});

// port
const PORT = process.env.PORT || 5000;

// api routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} successfully`);
});
