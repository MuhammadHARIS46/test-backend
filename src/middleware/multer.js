const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const limits = {
  fileSize: 1024 * 1024 * 5,
};

exports.upload = multer({ storage: storage, limits: limits });