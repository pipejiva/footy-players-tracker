const { validationResult } = require("express-validator");
const Player = require("../models/Player");
const Test = require("../models/Test");

exports.getPlayers = async (req, res, next) => {
  try {
    const players = await Player.findAll({ include: Test });
    res.status(200).json({ players });
  } catch (err) {
    next(err);
  }
};

exports.createPlayer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, weight, height, clothingSize } = req.body;

  try {
    const player = await Player.create({ name, weight, height, clothingSize });
    res.status(201).json({ message: "Player created!", player });
  } catch (err) {
    next(err);
  }
};

exports.updatePlayer = async (req, res, next) => {
  const playerId = req.params.playerId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, weight, height, clothingSize } = req.body;

  try {
    const player = await Player.findByPk(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    player.name = name;
    player.weight = weight;
    player.height = height;
    player.clothingSize = clothingSize;

    await player.save();
    res.status(200).json({ message: "Player updated!", player });
  } catch (err) {
    next(err);
  }
};

exports.deletePlayer = async (req, res, next) => {
  const playerId = req.params.playerId;

  try {
    const player = await Player.findByPk(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    await player.destroy();
    res.status(200).json({ message: "Player deleted!" });
  } catch (err) {
    next(err);
  }
};

exports.addTest = async (req, res, next) => {
  const playerId = req.params.playerId;
  const {
    speedAgility,
    endurance,
    strength,
    power,
    flexibility,
    handball,
    marking,
    tackling,
    gameReading,
    teamwork,
  } = req.body;

  try {
    const player = await Player.findByPk(playerId);
    if (!player) {
      return res.status(404).json({ message: "Player not found." });
    }

    const test = await Test.create({
      speedAgility,
      endurance,
      strength,
      power,
      flexibility,
      handball,
      marking,
      tackling,
      gameReading,
      teamwork,
      playerId,
    });

    res.status(201).json({ message: "Test added!", test });
  } catch (err) {
    next(err);
  }
};

exports.getTests = async (req, res, next) => {
  const playerId = req.params.playerId;

  try {
    const tests = await Test.findAll({ where: { playerId } });
    res.status(200).json({ tests });
  } catch (err) {
    next(err);
  }
};
