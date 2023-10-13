const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Model = require("./model");

const carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  model: {
    type: Schema.Types.ObjectId,
    ref: "Model",
  },
});

carSchema.post("save", async function () {
  const carID = this._id;
  const modelID = this.model;
  const selectedModel = await Model.findById(modelID);
  selectedModel.cars.push(carID);
  await selectedModel.save();
});

const Car = model("Car", carSchema);
module.exports = Car;
