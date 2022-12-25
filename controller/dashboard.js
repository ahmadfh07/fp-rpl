const express = require("express");
const router = express.Router();
const Document = require("../model/document");
const Category = require("../model/category");
const { isAdmin } = require("../utils/auth");
const { basedOnCategory, basedOnName, documentDefault } = require("../utils/filterAndSearch");

router.get("/", async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  const categories = await Category.find();
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const perPage = 3;
  let documents;
  let numOfResult;
  let checkedPage;
  let option;
  if (req.query.filter) {
    documents = (await basedOnCategory(req.query.filter, perPage, page)).documentPerKategori;
    numOfResult = (await basedOnCategory(req.query.filter, perPage, page)).numOfResult;
    checkedPage = (await basedOnCategory(req.query.filter, perPage, page)).checkedPage;
    option = `filter=${req.query.filter}`;
  } else if (req.query.search) {
    documents = (await basedOnName(req.query.search, perPage, page)).documentBasedOnName;
    numOfResult = (await basedOnName(req.query.search, perPage, page)).numOfResult;
    checkedPage = (await basedOnName(req.query.search, perPage, page)).checkedPage;
    option = `search=${req.query.search}`;
  } else {
    documents = (await documentDefault(perPage, page)).documentDefault;
    numOfResult = (await documentDefault(perPage, page)).numOfResult;
    checkedPage = (await documentDefault(perPage, page)).checkedPage;
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
    current: req.query.page ? checkedPage : 1,
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
  let checkedPage;
  let option;
  if (req.query.filter) {
    documents = (await basedOnCategory(req.query.filter, perPage, page)).documentPerKategori;
    numOfResult = (await basedOnCategory(req.query.filter, perPage, page)).numOfResult;
    checkedPage = (await basedOnCategory(req.query.filter, perPage, page)).checkedPage;
    option = `filter=${req.query.filter}`;
  } else if (req.query.search) {
    documents = (await basedOnName(req.query.search, perPage, page)).documentBasedOnName;
    numOfResult = (await basedOnName(req.query.search, perPage, page)).numOfResult;
    checkedPage = (await basedOnName(req.query.search, perPage, page)).checkedPage;
    option = `search=${req.query.search}`;
  } else {
    documents = (await documentDefault(perPage, page)).documentDefault;
    numOfResult = (await documentDefault(perPage, page)).numOfResult;
    checkedPage = (await documentDefault(perPage, page)).checkedPage;
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
    current: req.query.page ? checkedPage : 1,
    totalPages,
    isEditAndDelete: false,
    option,
    isEditAndDelete,
  });
});

module.exports = router;
