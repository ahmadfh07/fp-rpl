const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  res.render("dashboard", {
    title: "Dashboard",
    layout: "layout/main-layout",
    cssName: "dashboard",
    username,
    useremail,
    userrole,
  });
});

module.exports = router;
