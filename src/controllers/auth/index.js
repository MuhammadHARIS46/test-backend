const express = require("express");
const User = require("../../models/user");

const {
  uploadToCloudinary,
  bufferToDataURI,
} = require("../../utils/imageUpload");

exports.signup = async (req, res) => {
  const { name, email, username } = req.body;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (req.file) {
      const file = req.file;
      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = await bufferToDataURI(fileFormat, file.buffer);
      const imageUrl = await uploadToCloudinary(base64, fileFormat);
      const result = await User.create({
        name,
        email,
        username,
        imageUrl: imageUrl.secure_url,
      });
      res.status(200).json({
        result: {
          name: name,
          email: email,
          username: username,
          _id: result._id,
          imageUrl: imageUrl.secure_url,
        },
      });
    } else {
      const result = await User.create({
        name,
        email,
        username,
        imageUrl: "",
      });
      res.status(200).json({
        result: {
          name: name,
          email: email,
          username: username,
          _id: result._id,
          imageUrl: "",
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    let { sortBy, sortOrder } = req.query;
    sortBy = sortBy || 'name';
    sortOrder = sortOrder || 'asc';

    if (!['asc', 'desc'].includes(sortOrder.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid sortOrder value. It should be "asc" or "desc".' });
    }

    const validSortFields = ['name', 'email', 'username'];
    if (!validSortFields.includes(sortBy.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid sortBy field. It should be "name", "email", or "username".' });
    }
    const customers = await User.find().sort({ [sortBy]: sortOrder });

    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, username } = req.body;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "No user found with this id" });
    }

    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    existingUser.username = username || existingUser.username;

    if (req.file) {
      const file = req.file;
      const fileFormat = file.mimetype.split("/")[1];
      const { base64 } = await bufferToDataURI(fileFormat, file.buffer);
      const imageUrl = await uploadToCloudinary(base64, fileFormat);
      existingUser.imageUrl = imageUrl.secure_url;
    }

    const updatedUser = await existingUser.save();

    res.status(200).json({
      result: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        imageUrl: updatedUser.imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

exports.deleteUser = async (req,res) =>{
  try{
    const { id } = req.params;
    let existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "No user found with this id" });
    }
    existingUser = await User.findByIdAndDelete(id)
    res.json({"Successs":"User has been Deleted",user:existingUser})
  }
  catch{
    console.error(error);
    res.status(500).json({ message: error });
  }
}
exports.getUserById = async (req,res) =>{
  try{
    const {id} = req.params;
    let existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "No user found with this id" });
    }
    existingUser = await User.findById(id)
    res.json({user:existingUser})
  }
  catch{
    console.error(error);
    res.status(500).json({ message: error });
  }
}