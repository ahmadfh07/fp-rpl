const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.render("login", {
    title: "Login",
    layout: "layout/main-layout",
    cssName: "login",
    destination: !req.query.dest ? null : req.query.dest,
  });
});

router.post("/", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: !req.query.dest ? "/dashboard" : req.query.dest,
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
