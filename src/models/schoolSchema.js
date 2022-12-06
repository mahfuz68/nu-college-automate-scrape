const { model, default: mongoose } = require("mongoose");

const schoolSchema = mongoose.Schema({
  EIIN: Number,
  name: String,
  zilla: String,
  upazila: String,
  examine: [{ type: mongoose.Types.ObjectId, ref: "Roll" }],
});

module.exports.schoolModel = model("School", schoolSchema);
