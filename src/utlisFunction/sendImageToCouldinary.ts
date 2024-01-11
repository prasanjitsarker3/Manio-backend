import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";

cloudinary.config({
  cloud_name: "dby9tcuil",
  api_key: "511759649588371",
  api_secret: "_OTTEH8U82ubXpom7nKw8ibPgcQ",
});

export const uploadImageToCloudinary = (path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: "Manio Products" },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
        fs.unlink(path, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log("File is Deleted");
          }
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
