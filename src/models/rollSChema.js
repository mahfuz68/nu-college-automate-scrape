const { Schema, Model, mongo, default: mongoose } = require("mongoose");

const newSchema = new Schema({});

const rollSchema = new Schema({
  roll: Number,
  name: String,
  fatherName: String,
  motherName: String,
  result: [
    {
      firstSubjectCode: {
        type: Number,
        required: true,
      },
      firstSubjectName: {
        type: String,
        required: true,
      },
      firstSubjectGrade: {
        type: String,
        required: true,
      },
    },
    {
      secondSubjectCode: Number,
      secondSubjectName: String,
      secondSubjectGrade: String,
    },
  ],
});

module.exports.RollModel = mongoose.model("Roll", rollSchema);
