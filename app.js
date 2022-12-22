if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { upload, connectDB, mongoose, sessionStore } = require("./model/dbConnect");
const Document = require("./model/document");
const Category = require("./model/category");
const { ensureAuthenticated, isAdmin } = require("./utils/auth");

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const Grid = require("gridfs-stream");
const cookieParser = require("cookie-parser");

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

app.use("/login", require("./controller/login"));
app.use("/signup", require("./controller/signup"));
app.use("/upload", require("./controller/uploadUpdate"));
app.use("/view", require("./controller/viewDocument"));
app.use("/dashboard", require("./controller/dashboard"));
app.use("/account-info", require("./controller/accountInfo"));

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

app.get("/files/:name", ensureAuthenticated, (req, res) => {
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

app.post("/uploadfile", isAdmin, upload.single("file"), async (req, res) => {
  // Reciever.insertMany({ Nama: contact.Nama, NoHp: contact.NoHp, url }, (err, result) => {});
  const categoryAvail = await Category.find({ namakategori: req.body.filekategori });
  if (!categoryAvail) Category.insert({ namakategori: req.body.filekategori, oleh: req.user.email });
  Document.insertMany({
    filename: req.body.filename,
    filedesc: req.body.filedesc,
    filekategori: req.body.filekategori,
    referencename: req.file.filename,
    uploader: req.user.email,
  });
  res.redirect("/");
});

app.post("/updatefile", isAdmin, upload.single("file"), async (req, res) => {
  const categoryAvail = await Category.findOne({ namakategori: req.body.filekategori });
  if (!categoryAvail) Category.insertMany({ namakategori: req.body.filekategori, oleh: req.user.email });
  const documentUpdate = await Document.findOneAndUpdate(
    { _id: req.query.id },
    {
      filename: req.body.filename,
      filedesc: req.body.filedesc,
      filekategori: req.body.filekategori,
      referencename: req.file?.filename,
      uploader: req.user.email,
    },
    {
      new: true,
    }
  );
  res.redirect("/");
});

app.get("/deletefile", isAdmin, async (req, res) => {
  const document = await Document.findOne({ _id: req.query.id });
  Document.findOneAndDelete({ _id: req.query.id }, (e, f) => {
    gfs.files.findOne({ filename: document.referencename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists",
        });
      }
      gridfsBucket.delete(file._id);
      res.redirect("/dashboard/admin");
    });
  });
});

app.use((req, res) => {
  res.status(404);
  res.render("notfound", {
    title: "404",
    layout: "layout/main-layout",
    cssName: "notfound",
  });
});

connectDB().then((conn) => {
  conn.once("open", async () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads",
    });
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
    console.log("gridFS stream established");

    app.listen(process.env.PORT || port, () => {
      console.log(`Express server listening on port ${port} in ${app.settings.env} mode`);
    });
  });
});
