const { Schema, mongo, default: mongoose, Types, model } = require("mongoose");

const rollSchema = mongoose.Schema({
  roll: { type: Number, require: true },
  name: String,
  fatherName: String,
  motherName: String,
  board: String,
  group: String,
  type: String,
  institute: String,
  subjectCode: String,
  subjectName: String,
  subjectGPA: String,
  gPA: Number,
  result: Array,
});

module.exports.rollModel = model("Roll", rollSchema);
