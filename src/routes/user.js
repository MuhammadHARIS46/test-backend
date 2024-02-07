const express = require('express')
const { signup,getAllUsers,updateUser,deleteUser,getUserById } = require('../controllers/auth/index');
const { upload } = require("../middleware/multer");

const router = express.Router();

router.post("/register",upload.single("image"),signup)
router.get("/get-all",getAllUsers)
router.put("/update/:id",upload.single("image"),updateUser)
router.delete("/delete/:id",deleteUser)
router.get("/user/:id",getUserById)

module.exports = router;