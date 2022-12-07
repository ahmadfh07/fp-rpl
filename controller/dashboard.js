const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard", {
    title: "Dashboard",
    layout: "layout/main-layout",
    cssName: "dashboard",
  });
});

module.exports = router;
