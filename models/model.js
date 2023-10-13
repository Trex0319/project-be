const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  detail: {
    type: String,
  },
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const Model = model("Model", modelSchema);
module.exports = Model;
