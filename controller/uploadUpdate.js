const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("uploadUpdate", {
    title: "Upload / Update",
    layout: "layout/main-layout",
    cssName: "uploadUpdate",
  });
});

module.exports = router;
