const { model, default: mongoose } = require("mongoose");

const schoolSchema = mongoose.Schema({
  EIIN: { type: Number, require: true },
  name: { type: String, require: true },
  zilla: { type: String, require: true },
  upazila: { type: String, require: true },
  examine: [{ type: mongoose.Types.ObjectId, ref: "Roll" }],
});

const schoolModel = new model("School", schoolSchema);
module.exports = schoolModel;
