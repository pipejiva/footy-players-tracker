const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Test = sequelize.define("Test", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  speedAgility: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  endurance: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  strength: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  power: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  flexibility: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  handball: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  marking: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  tackling: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  gameReading: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  teamwork: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  playerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Test;
