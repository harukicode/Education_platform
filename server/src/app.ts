import express from "express";
import cors from "cors";
import cookies from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI as string;

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookies());

app.use("/api/auth", authRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
