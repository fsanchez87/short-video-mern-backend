import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import Videos from "./dbModel.js";
import Cors from "cors";

//App Config
const app = express();
const port = process.env.PORT;
const connection_url = process.env.MONGO_URI;

//Middleware
app.use(express.json());
app.use(Cors());

//DB config
mongoose.connect(connection_url);

//API endpoint
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/v2/posts", (req, res) => {
  const dbVideos = req.body;
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => console.log(`Listening on localhost ${port}`));
