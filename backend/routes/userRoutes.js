const express = require("express");
const router = express.Router();
const {registerUser, authUser, updateUserProfile} = require("../controllers/userControllers.js");
const { protect } = require('../middlewares/authMiddleware.js');

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;