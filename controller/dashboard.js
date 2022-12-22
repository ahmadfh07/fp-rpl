const express = require("express");
const router = express.Router();
const Document = require("../model/document");
const { isAdmin } = require("../utils/auth");

router.get("/", async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  const documents = await Document.find();
  res.render("dashboard", {
    title: "Dashboard",
    layout: "layout/secondary-layout",
    cssName: "dashboard",
    username,
    useremail,
    userrole,
    documents,
    isEditAndDelete: false,
  });
});

router.get("/admin", isAdmin, async (req, res) => {
  const { name: username, email: useremail, role: userrole } = req.user || {};
  const documents = await Document.find();
  const isEditAndDelete = userrole === "Admin" ? true : false;
  res.render("dashboard", {
    title: "Dashboard",
    layout: "layout/secondary-layout",
    cssName: "dashboard",
    username,
    useremail,
    userrole,
    documents,
    isEditAndDelete,
  });
});

module.exports = router;
