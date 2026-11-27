import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import uploadDir from "../config/storage.js";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${crypto.randomUUID()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;

    if (!allowedExtensions.test(path.extname(file.originalname))) {
      return cb(new Error("Only JPG, JPEG and PNG files are allowed"));
    }

    cb(null, true);
  },
});

export default upload;
