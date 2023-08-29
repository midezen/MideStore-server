import mongoose from "mongoose";

const UserSchema = new mongoose.schema({
  firstName: { type: String },
});
