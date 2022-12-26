const Document = require("../model/document");

module.exports = {
  basedOnCategory: async function (category, perPage, page) {
    return {
      documentPerKategori: await Document.find({ filekategori: category })
        .sort({ _id: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .sort({ _id: -1 }),
      numOfResult: await Document.find({ filekategori: category }).countDocuments(),
    };
  },
  basedOnName: async function (name, perPage, page) {
    return {
      documentBasedOnName: await Document.find({ filename: { $regex: name, $options: "i" } })
        .sort({ _id: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
      numOfResult: await Document.find({ filename: { $regex: name, $options: "i" } }).countDocuments(),
    };
  },
};
