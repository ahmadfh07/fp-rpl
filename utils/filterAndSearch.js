const Document = require("../model/document");

module.exports = {
  basedOnCategory: async function (category) {
    return await Document.find({ filekategori: category });
  },
  basedOnName: async function (name) {
    return await Document.find({ filename: { $regex: name, $options: "i" } });
  },
};
