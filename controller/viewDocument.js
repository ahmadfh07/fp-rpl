const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../utils/auth");
const Document = require("../model/document");

router.get("/", ensureAuthenticated, async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  const document = await Document.findOne({ _id: req.query.id });
  res.render("viewDocument", {
    title: "View",
    layout: "layout/secondary-layout",
    cssName: "viewDocument",
    filename: document.referencename,
    username,
    useremail,
    userrole,
    document,
  });
});

module.exports = router;
