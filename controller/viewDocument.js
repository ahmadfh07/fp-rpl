const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("viewDocument", {
    title: "View",
    layout: "layout/main-layout",
    cssName: "viewDocument",
  });
});

module.exports = router;
