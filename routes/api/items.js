const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item model
const Item = require("../../models/Item");

//@Route  GET api/items
//@desc   Get All Items
//@Access Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@Route  POST api/items
//@desc   Create an Item
//@Access Private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then((item) => res.json(item));
});

//@Route  DELETE api/items
//@desc   Delete an Item
//@Access Private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
