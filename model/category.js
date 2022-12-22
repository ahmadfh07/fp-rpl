const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  namakategori: {
    type: String,
    required: true,
  },
  oleh: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
