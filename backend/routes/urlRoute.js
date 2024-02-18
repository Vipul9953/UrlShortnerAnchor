const express = require('express');
const {  redirectToOriginalURL, createShortURL } = require('../controllers/urlController');
const { isAuthenticatedUser } = require('../middleware/auth');
const { deleteURL } = require('../controllers/userController');
const router = express.Router();

router.route("/short").post(isAuthenticatedUser,createShortURL);
router.route("/short/:shortCode").get(redirectToOriginalURL);
router.route("/delete/:id").delete(deleteURL);


module.exports = router;
