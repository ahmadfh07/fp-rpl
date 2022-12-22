const mongoose = require("mongoose");
const DocumentSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  filedesc: {
    type: String,
    required: true,
  },
  filekategori: {
    type: String,
    required: true,
  },
  referencename: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Document = mongoose.model("Document", DocumentSchema);

module.exports = Document;
