const express = require("express");
const { body } = require("express-validator");
const playerController = require("../controllers/player");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

/**
 * @swagger
 * /api/player:
 *   get:
 *     summary: Get all players
 *     description: Retrieves all players from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved players.
 *       '401':
 *         description: Unauthorized access.
 */
router.get("/player", isAuth, playerController.getPlayers);

/**
 * @swagger
 * /api/player:
 *   post:
 *     summary: Create a new player
 *     description: Creates a new player with the provided details.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               clothingSize:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Player created successfully.
 *       '400':
 *         description: Bad request or invalid player data.
 *       '401':
 *         description: Unauthorized access.
 */
router.post(
  "/player",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("weight").isFloat(),
    body("height").isFloat(),
    body("clothingSize").trim().not().isEmpty(),
  ],
  playerController.createPlayer
);

/**
 * @swagger
 * /api/{playerId}:
 *   put:
 *     summary: Update a player
 *     description: Updates an existing player with the provided details.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               clothingSize:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Player updated successfully.
 *       '400':
 *         description: Bad request or invalid player data.
 *       '401':
 *         description: Unauthorized access.
 */
router.put(
  "/:playerId",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("weight").isFloat(),
    body("height").isFloat(),
    body("clothingSize").trim().not().isEmpty(),
  ],
  playerController.updatePlayer
);

/**
 * @swagger
 * /api/{playerId}:
 *   delete:
 *     summary: Delete a player
 *     description: Deletes an existing player.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Player deleted successfully.
 *       '401':
 *         description: Unauthorized access.
 */
router.delete("/:playerId", isAuth, playerController.deletePlayer);

/**
 * @swagger
 * /api/{playerId}/tests:
 *   post:
 *     summary: Add test for a player
 *     description: Adds a new test for a specific player.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               result:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Test added successfully.
 *       '400':
 *         description: Bad request or invalid test data.
 *       '401':
 *         description: Unauthorized access.
 */
router.post("/:playerId/tests", isAuth, playerController.addTest);

/**
 * @swagger
 * /api/{playerId}/tests:
 *   get:
 *     summary: Get tests for a player
 *     description: Retrieves all tests for a specific player.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved tests.
 *       '401':
 *         description: Unauthorized access.
 */
router.get("/:playerId/tests", isAuth, playerController.getTests);

module.exports = router;
