const { default: mongoose, Types, model } = require("mongoose");

const rollSchema = mongoose.Schema(
  {
    roll: { type: Number, require: true },
    name: String,
    fatherName: String,
    motherName: String,
    board: String,
    group: String,
    type: String,
    institute: String,
    eiin: Number,
    gPA: Number,
    result: Array,
  },
  {
    timestamps: true,
  }
);

module.exports.rollModel = model("Roll", rollSchema);
