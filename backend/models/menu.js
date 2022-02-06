const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  name: { type: String, rquired: true },
  price: { type: Number, require: true },
  category: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
});

module.exports = mongoose.model("Menu", menuSchema);
