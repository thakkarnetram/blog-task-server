const express = require("express");
const signupController = require("../controllers/signupController");

const router = express.Router();

router.route("/signup").post(signupController.signUp);

module.exports = router;
