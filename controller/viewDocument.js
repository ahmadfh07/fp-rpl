const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../utils/auth");

router.get("/", ensureAuthenticated, (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  res.render("viewDocument", {
    title: "View",
    layout: "layout/secondary-layout",
    cssName: "viewDocument",
    filename: req.query.filename || "notfound.pdf",
    username,
    useremail,
    userrole,
  });
});

module.exports = router;
