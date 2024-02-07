require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const api_key = process.env.api_key
const api_secret = process.env.api_secret
const cloud_name = process.env.cloud_name

cloudinary.config({
  cloud_name: cloud_name,
  api_key: api_key,
  api_secret: api_secret,
});

const uploadToCloudinary = async (fileString, format) => {
  try {
    const { uploader } = cloudinary;

    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`
    );

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

const DatauriParser = require("datauri/parser");

const parser = new DatauriParser();

const bufferToDataURI = async (fileFormat, buffer) =>
  await parser.format(fileFormat, buffer);

module.exports = {
  uploadToCloudinary,
  bufferToDataURI,
};