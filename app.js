if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { upload, connectDB, mongoose, sessionStore } = require("./model/dbConnect");
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
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const Grid = require("gridfs-stream");
const cookieParser = require("cookie-parser");

//passport config:

const port = 3000;
const app = express();
let gfs, gridfsBucket;

require("./utils/passport")(passport);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/dashboard");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "Now logged out");
    res.redirect("/login");
  });
});

app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    // Files exist
    return res.json(files);
  });
});

app.get("/files/:name", (req, res) => {
  gfs.files.findOne({ filename: req.params.name }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    const readstream = gridfsBucket.openDownloadStream(file._id);
    readstream.pipe(res);
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/");
});

app.use("/login", login);
app.use("/signup", signup);
app.use("/uploadUpdate", uploadUpdate);
app.use("/viewDocument", viewDocument);
app.use("/dashboard", dashboard);
app.use("/accountInfo", accountInfo);

app.use((req, res) => {
  res.status(404);
  res.render("notfound", {
    title: "404",
    layout: "layout/main-layout",
    cssName: "notfound",
  });
});

connectDB().then((conn) => {
  conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
  });
  app.listen(process.env.PORT || port, () => {
    console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
  });
});
