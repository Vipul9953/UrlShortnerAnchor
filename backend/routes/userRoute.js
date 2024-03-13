const express = require("express");
const {isAuthenticatedUser} = require("../middleware/auth") 
const {  login,  forgotPassword, resetPassword, registerUser, getMyUrls, logoutUser } = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logoutUser);
router.route("/my/urls").get(isAuthenticatedUser, getMyUrls);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;
