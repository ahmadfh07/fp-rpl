const Document = require("../model/document");

const checkPage = function (page, numOfResult, perPage) {
  if (isNaN(page)) {
    return 1;
  } else if (page < 1) {
    return 1;
  } else if (page > Math.ceil(numOfResult / perPage)) {
    return Math.ceil(numOfResult / perPage);
  } else {
    return page;
  }
};

module.exports = {
  basedOnCategory: async function (category, perPage, page) {
    const numOfResult = await Document.find({ filekategori: category }).countDocuments();
    const checkedPage = checkPage(page, numOfResult, perPage);
    return {
      documentPerKategori: await Document.find({ filekategori: category })
        .sort({ _id: -1 })
        .skip(perPage * (checkedPage - 1))
        .limit(perPage)
        .sort({ _id: -1 }),
      numOfResult,
      checkedPage,
    };
  },
  basedOnName: async function (name, perPage, page) {
    const numOfResult = await Document.find({ filename: { $regex: name, $options: "i" } }).countDocuments();
    const checkedPage = checkPage(page, numOfResult, perPage);
    return {
      documentBasedOnName: await Document.find({ filename: { $regex: name, $options: "i" } })
        .sort({ _id: -1 })
        .skip(perPage * (checkedPage - 1))
        .limit(perPage),
      numOfResult,
      checkedPage,
    };
  },
  documentDefault: async function (perPage, page) {
    const numOfResult = await Document.find({}).countDocuments();
    const checkedPage = checkPage(page, numOfResult, perPage);
    return {
      documentDefault: await Document.find({})
        .sort({ _id: -1 })
        .skip(perPage * (checkedPage - 1))
        .limit(perPage),
      numOfResult,
      checkedPage,
    };
  },
};
