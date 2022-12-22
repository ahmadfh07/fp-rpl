const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");
const Document = require("../model/document");
const Category = require("../model/category");

router.get("/:status", isAdmin, async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  let document;
  if (req.params.status === "update") {
    document = await Document.findOne({ _id: req.query.id });
  }
  const categories = await Category.find({});
  res.render("uploadUpdate", {
    title: !document ? "Upload" : "Update",
    layout: "layout/secondary-layout",
    cssName: "uploadUpdate",
    username,
    useremail,
    userrole,
    document,
    categories,
    documentDate: !document ? new Date(Date.now()).toISOString().substring(0, 10) : document.date.toISOString().substring(0, 10),
  });
});

module.exports = router;
