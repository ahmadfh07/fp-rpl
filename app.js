const { connectDB } = require("./model/dbConnect");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require("path");

const port = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.get("/", (req, res) => {
  res.render("login", {
    title: "Login",
    layout: "layout/main-layout",
    cssName: "login",
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("404");
});

connectDB().then(() => {
  app.listen(process.env.PORT || port, () => {
    console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
  });
});
