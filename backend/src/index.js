const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./utils/database");

// Get enviroment variables from .env

const app = express();

// Middlewares
app.use(bodyParser.json());

// Routes
const authRoutes = require("./routes/auth");
const playerRoutes = require("./routes/players");

app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Server on${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });