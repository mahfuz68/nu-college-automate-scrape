const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const { roll } = require("./automation/roll/roll");
const { rollModel } = require("./src/models/rollSchema");
const { schoolModel } = require("./src/models/schoolSchema");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello mahfuz");
});

app.post("/", async (req, res) => {
  const { eiin } = req.body;
  console.log(typeof eiin);

  const rollEntry = new rollModel(req.body);
  try {
    const rollSuccess = await rollEntry.save();
    console.log(rollSuccess);
    await schoolModel.updateOne(
      {
        EIIN: eiin,
      },
      {
        $push: {
          examine: rollSuccess._id,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
  res.json(req.body);
});

app.post("/update", async (req, res) => {
  try {
    await schoolModel.updateOne(
      { EIIN: 103149 },
      {
        $push: {
          examine: "638ef1fb75664ede8caf6915",
        },
      }
    );
    res.json("update successfully");
  } catch (err) {
    console.log(err);
  }
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
