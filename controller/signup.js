const express = require("express");
const router = express.Router();
const User = require("../model/user");
// const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

router.get("/", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    layout: "layout/main-layout",
    cssName: "signup",
    destination: !req.query.dest ? null : req.query.dest,
  });
});

router.post("/", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];
  console.log(" Name " + name + " email :" + email + " pass:" + password);
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (password !== password2) {
    errors.push({ msg: "passwords dont match" });
  }
  if (password.length < 6) {
    errors.push({ msg: "password atleast 6 characters" });
  }
  if (errors.length > 0) {
    res.render("signup", {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
      title: "Sign Up",
      layout: "layout/main-layout",
      cssName: "signup",
      destination: !req.query.dest ? null : req.query.dest,
    });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: "email already registered" });
        res.render("signup", {
          errors,
          name,
          email,
          password,
          password2,
          title: "Sign Up",
          layout: "layout/main-layout",
          cssName: "signup",
          destination: !req.query.dest ? null : req.query.dest,
        });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        //hash password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((value) => {
                console.log(value);
                req.flash("success_msg", "You have now registered!");
                res.redirect(!req.query.dest ? "/login" : `/login?dest=${req.query.dest}`);
              })
              .catch((value) => console.log(value));
          })
        );
      }
    });
  }
});

module.exports = router;
