if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const path = require("path");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const crypto = require("crypto");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected `);
    return mongoose.connection;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const storage = new GridFsStorage({
  url: process.env.DATABASE_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: {
            uploader: req.user.name,
          },
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "sessions",
  autoRemove: "native",
  ttl: 1000 * 60 * 60 * 24,
});

module.exports = { upload, connectDB, mongoose, sessionStore };
