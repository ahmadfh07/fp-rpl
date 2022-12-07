const { connectDB } = require("./model/dbConnect");
const login = require("./controller/login");
const signup = require("./controller/signup");
const uploadUpdate = require("./controller/uploadUpdate");
const viewDocument = require("./controller/viewDocument");
const dashboard = require("./controller/dashboard");
const accountInfo = require("./controller/accountInfo");

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

// routes
app.use("/login", login);
app.use("/signup", signup);
app.use("/uploadUpdate", uploadUpdate);
app.use("/viewDocument", viewDocument);
app.use("/dashboard", dashboard);
app.use("/accountInfo", accountInfo);

app.use((req, res) => {
  res.status(404);
  res.send("404");
});

connectDB().then(() => {
  app.listen(process.env.PORT || port, () => {
    console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
  });
});
