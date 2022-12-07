const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", {
    title: "Login",
    layout: "layout/main-layout",
    cssName: "login",
  });
});

module.exports = router;
