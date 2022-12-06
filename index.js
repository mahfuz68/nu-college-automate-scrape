const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const { rollModel } = require("./src/models/rollSchema");
const { schoolModel } = require("./src/models/schoolSchema");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello mahfuz");
});

app.get("/individual", async (req, res) => {
  const roll = req.query.roll;
  const rollNumber = Number(roll);
  const year = req.query.year;
  try {
    const response = await rollModel.find(
      { roll: rollNumber },
      {},
      { maxTimeMS: 1000 }
    );
    res.status(200).json({
      result: response,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({ err: "There was an server side error!" });
  }

  console.log(typeof rollNumber, rollNumber);
});

app.get("/institution", async (req, res) => {
  const eiin = req.query.eiin;
  const eiinNumber = Number(eiin);
  const year = req.query.year;

  schoolModel
    .find({ eiin: eiinNumber })
    .populate("examine", "roll gpa -_id")
    .maxTimeMS(1000)
    .select({
      _id: 0,
      __v: 0,
    })
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});

app.post("/", async (req, res) => {
  const { eiin } = req.body;

  const rollEntry = new rollModel(req.body);
  try {
    const rollSuccess = await rollEntry.save();
    console.log(rollSuccess?.roll);
    await schoolModel.updateOne(
      {
        eiin: eiin,
      },
      {
        $push: {
          examine: rollSuccess._id,
        },
      }
    );
    res.status(200).json("roll inserted successfully");
  } catch (err) {
    console.log(err);
  }
});

app.post("/school", async (req, res) => {
  const { EIIN, name, examine } = req.body;
  const schoolEntry = new schoolModel(req.body);
  try {
    const data = await schoolEntry.save();
    res.status(200).json("school inserted successfully");
    console.log(data?.name);
  } catch (err) {
    console.log(err);
  }
});

const mongoDBUrl =
  "mongodb+srv://mahfuz:mahfuzzz@cluster0.tai23b4.mongodb.net/ssc?retryWrites=true&w=majority";
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
