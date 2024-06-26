const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");

const router = express.Router();

// Auth routes
router.post(
  "/signup",
  [
    body("username").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
