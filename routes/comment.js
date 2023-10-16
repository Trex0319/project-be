const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.js");
const authMiddleware = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

router.get("/:id", async (request, response) => {
  try {
    const car_id = request.params.id;
    response
      .status(200)
      .send(await Comment.find({ car: car_id }).populate("user"));
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.post("/", isAdmin, async (request, response) => {
  try {
    const newComment = new Comment({
      comments: request.body.comments,
      user: request.user.id,
      car: request.body.car,
    });
    const savedComment = await newComment.save();
    response.status(200).send(savedComment);
  } catch (error) {
    response.status(400).send({ message: error._message });
  }
});

router.delete("/:id", authMiddleware, async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);
    if (request.user._id.toString() === comment.user.toString()) {
      await Comment.findByIdAndDelete(request.params.id);
      response.status(200).send("The comment has been deleted.");
    }
  } catch (error) {
    console.log(error);
    response.status(400).send({ message: error._message });
  }
});

module.exports = router;
