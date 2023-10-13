const express = require("express");
const router = express.Router();

const Model = require("../models/model");
const isAdmin = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await Model.find().populate("cars"));
  } catch (error) {
    res.status(400).send({ message: "Car not found" });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const newModel = new Model({
      name: req.body.name,
      detail: req.body.detail,
      image: req.body.image,
    });
    await newModel.save();
    res.status(200).send(newModel);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const model_id = req.params.id;
    const deleteModel = await Model.findByIdAndDelete(model_id);
    res.status(200).send(deleteModel);
  } catch (error) {
    res.status(400).send({ message: error._message });
  }
});

module.exports = router;
