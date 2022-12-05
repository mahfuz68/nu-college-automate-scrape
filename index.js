const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const { rollModel } = require("./src/models/rollSchema");
const schoolModel = require("./src/models/schoolSchema");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello mahfuz");
});

app.post("/", (req, res) => {
  const { name, fatherName, motherName, roll, result } = req.body;

  rollModel.insertMany(req.body, (err, res) => {
    if (err) {
      console.log(err);
    } else if (res) {
      console.log(res);
    }
  });
  res.json(req.body);
});

app.post("/school", async (req, res) => {
  const { EIIN, name, examine } = req.body;
  const schoolEntry = new schoolModel(req.body);
  try {
    const data = await schoolEntry.save();
    res.status(200).json(req.body);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

const mongoDBUrl =
  "mongodb+srv://admin:amijani1@cluster0.1c2dp.mongodb.net/scrape";
// "mongodb+srv://admin:mahfuz@mahfuz.pute8tu.mongodb.net/scrape";

mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connection successfully"))
  .catch((e) => console.log(e));

app.listen("5000", () => {
  console.log("app listen port 5000");
});
