const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("hello mahfuz");
});

const mongoDBUrl =
  "mongodb+srv://admin:amijani1@cluster0.1c2dp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connection successfully"))
  .catch((e) => console.log(e));
app.use(express.json());

app.listen("5000", () => {
  console.log("app listen port 5000");
});
