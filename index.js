import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log("server running...");
    });
  });

mongoose.set("strictQuery", false);