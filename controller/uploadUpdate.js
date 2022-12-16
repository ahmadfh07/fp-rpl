const express = require("express");
const router = express.Router();
const { isAdmin } = require("../utils/auth");

router.get("/", isAdmin, (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  res.render("uploadUpdate", {
    title: "Upload / Update",
    layout: "layout/secondary-layout",
    cssName: "uploadUpdate",
    username,
    useremail,
    userrole,
  });
});

module.exports = router;
