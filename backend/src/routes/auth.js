const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/auth");

const router = express.Router();

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: User Registration
 *     description: Creates a new user with the provided username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User registered successfully.
 *       '400':
 *         description: Bad request or invalid user data.
 */
router.post(
  "/user",
  [
    body("username").trim().not().isEmpty(),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.signup
);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User Login
 *     description: Logs in an existing user with the provided credentials.
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Unauthorized access or invalid credentials.
 */
router.post("/login", authController.login);

module.exports = router;
