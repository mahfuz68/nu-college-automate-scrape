const express = require("express");
const { default: mongoose, Schema } = require("mongoose");
const { RollModel } = require("./src/models/rollSChema");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello mahfuz");
});

app.post("/", (req, res) => {
  const { name, fatherName, motherName, roll, result } = req.body;

  RollModel.insertMany(
    { name, fatherName, motherName, roll, result },
    (err, succ) => {
      if (err) {
        console.log(err);
      } else if (succ) {
        console.log(succ);
      }
    }
  );
  res.json("data inserted successfully");
});

const mongoDBUrl =
  "mongodb+srv://admin:amijani1@cluster0.1c2dp.mongodb.net/scrape?retryWrites=true&w=majority";

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
