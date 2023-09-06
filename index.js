import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/Auth.js";
import userRoute from "./routes/User.js";
import productRoute from "./routes/Product.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.dbSec)
  .then(() => console.log("db connection is successful"))
  .catch((err) =>
    console.log("db connection is unsuccessful. This is the problem => " + err)
  );

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(8000, () => {
  console.log("server is running");
});
