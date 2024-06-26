const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const Test = require("./Test");

const Player = sequelize.define("Player", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  height: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  clothingSize: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Player.hasMany(Test, { foreignKey: "playerId", onDelete: "CASCADE" });
Test.belongsTo(Player, { foreignKey: "playerId" });

module.exports = Player;
