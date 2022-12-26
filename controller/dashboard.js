const express = require("express");
const router = express.Router();
const Document = require("../model/document");
const Category = require("../model/category");
const { isAdmin } = require("../utils/auth");
const { basedOnCategory, basedOnName } = require("../utils/filterAndSearch");

router.get("/", async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  const categories = await Category.find();
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = 3;
  let documents;
  let numOfResult;
  let option;
  if (req.query.filter) {
    documents = (await basedOnCategory(req.query.filter, perPage, page)).documentPerKategori;
    numOfResult = (await basedOnCategory(req.query.filter, perPage, page)).numOfResult;
    option = `filter=${req.query.filter}`;
  } else if (req.query.search) {
    documents = (await basedOnName(req.query.search, perPage, page)).documentBasedOnName;
    numOfResult = (await basedOnName(req.query.search, perPage, page)).numOfResult;
    option = `search=${req.query.search}`;
  } else {
    documents = await Document.find({})
      .sort({ _id: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    numOfResult = await Document.find({}).countDocuments();
  }
  const totalPages = Math.ceil(numOfResult / perPage);
  res.render("dashboard", {
    title: "Dashboard",
    layout: "layout/secondary-layout",
    cssName: "dashboard",
    username,
    useremail,
    userrole,
    documents,
    categories,
    numOfResult,
    current: page,
    totalPages,
    isEditAndDelete: false,
    option,
  });
});

router.get("/admin", isAdmin, async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  const categories = await Category.find();
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = 3;
  let documents;
  let numOfResult;
  let option;
  if (req.query.filter) {
    documents = (await basedOnCategory(req.query.filter, perPage, page)).documentPerKategori;
    numOfResult = (await basedOnCategory(req.query.filter, perPage, page)).numOfResult;
    option = `filter=${req.query.filter}`;
  } else if (req.query.search) {
    documents = (await basedOnName(req.query.search, perPage, page)).documentBasedOnName;
    numOfResult = (await basedOnName(req.query.search, perPage, page)).numOfResult;
    option = `search=${req.query.search}`;
  } else {
    documents = await Document.find({})
      .sort({ _id: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    numOfResult = await Document.find({}).countDocuments();
  }
  const totalPages = Math.ceil(numOfResult / perPage);
  const isEditAndDelete = userrole === "Admin" ? true : false;
  res.render("dashboard", {
    title: "Dashboard",
    layout: "layout/secondary-layout",
    cssName: "dashboard",
    username,
    useremail,
    userrole,
    documents,
    categories,
    numOfResult,
    current: page,
    totalPages,
    isEditAndDelete: false,
    option,
    isEditAndDelete,
  });
});

module.exports = router;
