const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = require("./user");
const carSchema = require("./car");

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    comments: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Comment = model("Comment", commentSchema);
module.exports = Comment;
