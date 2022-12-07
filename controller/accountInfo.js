const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("accountInfo", {
    title: "Info Akun",
    layout: "layout/main-layout",
    cssName: "accountInfo",
  });
});

module.exports = router;
