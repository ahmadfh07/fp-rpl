const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};

  res.render("accountInfo", {
    title: "Info Akun",
    layout: "layout/secondary-layout",
    cssName: "accountInfo",
    username,
    useremail,
    userrole,
  });
});

module.exports = router;
