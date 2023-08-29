import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

mongoose
  .connect("link")
  .then(() => console.log("db connection is successful"))
  .catch((err) => console.log("db connection is unsuccessful " + err));

app.listen(8000, () => {
  console.log("server is running");
});
