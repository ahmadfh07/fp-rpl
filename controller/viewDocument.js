const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../utils/auth");

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("viewDocument", {
    title: "View",
    layout: "layout/secondary-layout",
    cssName: "viewDocument",
  });
});

module.exports = router;
