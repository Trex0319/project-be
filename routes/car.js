const express = require("express");
const router = express.Router();

const Car = require("../models/car");
const isAdmin = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    const { model } = req.query;
    let filter = {};
    if (model) {
      filter.model = model;
    }
    res
      .status(200)
      .send(await Car.find(filter).populate("model").sort({ _id: -1 }));
  } catch (error) {
    res.status(400).send({ message: "Car not found" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Car.findOne({ _id: req.params.id });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ message: "Car id not found" });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const newCar = new Car({
      name: req.body.name,
      detail: req.body.detail,
      price: req.body.price,
      model: req.body.model,
      image: req.body.image,
    });
    await newCar.save();
    res.status(200).send(newCar);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const car_id = req.params.id;

    const updatedCar = await Car.findByIdAndUpdate(car_id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).send(updatedCar);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const car_id = req.params.id;
    const deletePro = await Car.findByIdAndDelete(car_id);
    res.status(200).send(deletePro);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
