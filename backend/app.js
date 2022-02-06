const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const menuRoutes = require("./routes/menu");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://deva:1V7g12mUqtFwVBhj@cluster0.xz0bq.mongodb.net/myFirstDatabase"
  )
  .then(() => {
    console.log("Connected to DataBase");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/menu", menuRoutes);

app.use("/user", userRoutes);

module.exports = app;
