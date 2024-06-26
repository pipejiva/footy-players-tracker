const express = require("express");
const { body } = require("express-validator");
const playerController = require("../controllers/player");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// Players routes
router.get("/", isAuth, playerController.getPlayers);

router.post(
  "/",
  isAuth,
  [
    body("name").trim().not().isEmpty(),
    body("weight").isFloat(),
    body("height").isFloat(),
    body("clothingSize").trim().not().isEmpty(),
  ],
  playerController.createPlayer
);

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

router.delete("/:playerId", isAuth, playerController.deletePlayer);

// Rutas de gestión de pruebas
router.post("/:playerId/tests", isAuth, playerController.addTest);
router.get("/:playerId/tests", isAuth, playerController.getTests);

module.exports = router;
