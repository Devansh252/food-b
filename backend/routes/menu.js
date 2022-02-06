const express = require("express");
const Menu = require("../models/menu");
const router = express.Router();

router.post("", (req, res, next) => {
  const menu = new Menu({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });
  menu.save();

  res.status(201).json({
    message: "Item added suscessfully",
  });
});

router.get("", (req, res, next) => {
  Menu.find().then((documents) => {
    res
      .status(200)
      .json({ message: "posts send suscessfully", menus: documents });
  });
});

router.delete("/:id", (req, res, next) => {
  Menu.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Item deleted suscessfully",
    });
  });
});

router.patch("/:id", (req, res, next) => {
  const menu = new Menu({
    _id: req.params.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });
  Menu.findByIdAndUpdate({ _id: req.params.id }, menu).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Item Updated" });
  });
});

module.exports = router;
