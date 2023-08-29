import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

mongoose.connect("link");

app.listen(8000, () => {
  console.log("server is running");
});
