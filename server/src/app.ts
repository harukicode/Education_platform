import express from "express";
import cors from "cors";
const cookies = require("cookie-parser");
require("dotenv").config();
import mongoose from "mongoose";


const PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
