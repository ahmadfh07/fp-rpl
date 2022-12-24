const express = require("express");
const router = express.Router();
const Document = require("../model/document");
const Category = require("../model/category");
const { isAdmin } = require("../utils/auth");
const { basedOnCategory, basedOnName } = require("../utils/filterAndSearch");

router.get("/", async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  let documents;
  let numOfResult;
  if (req.query.filter) {
    documents = await basedOnCategory(req.query.filter);
    numOfResult = documents.length;
  } else if (req.query.search) {
    documents = await basedOnName(req.query.search);
    numOfResult = documents.length;
  } else {
    documents = await Document.find();
    numOfResult = documents.length;
  }
  const categories = await Category.find();
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
    isEditAndDelete: false,
  });
});

router.get("/admin", isAdmin, async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  let documents;
  let numOfResult;
  if (req.query.filter) {
    documents = await basedOnCategory(req.query.filter);
    numOfResult = documents.length;
  } else if (req.query.search) {
    documents = await basedOnName(req.query.search);
    numOfResult = documents.length;
  } else {
    documents = await Document.find();
    numOfResult = documents.length;
  }
  const categories = await Category.find();
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
    isEditAndDelete,
  });
});

module.exports = router;
