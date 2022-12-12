const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");

router.get("/", isAdmin, (req, res) => {
  res.render("uploadUpdate", {
    title: "Upload / Update",
    layout: "layout/main-layout",
    cssName: "uploadUpdate",
  });
});

module.exports = router;
