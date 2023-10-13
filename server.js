const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URL } = require("./config");

const app = express();
app.use(express.json());
const port = 8000;

// setup cors
const corsHandler = cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
  preflightContinue: true,
});

app.use(corsHandler);

// MongoDB Connection
mongoose
  .connect(MONGODB_URL + "carshowcase")
  .then(() => console.log("MongoDBConnected... "))
  .catch((err) => console.log(err));

// routes
const carRouter = require("./routes/car");
const imageRouter = require("./routes/image");
const modelRouter = require("./routes/model");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");

app.use("/cars", carRouter);
app.use("/images", imageRouter);
app.use("/models", modelRouter);
app.use("/auth", authRouter);
app.use("/comments", commentRouter);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Car-Showcase");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
