const express = require("express");
const Topic = require("../models/topic");
const auth = require("../auth/auth");
const router = new express.Router();

//Create Tpoic
router.post("/topic", auth, async (req, res) => {
  const topic = new Topic({
    ...req.body,
    createdBy: req.user._id,
  });

  try {
    await topic.save();
    res.status(201).send(topic);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// Get All Topics
router.get("/topics", auth, async (req, res) => {
  try {
    const topic = await Topic.find({ cretedBy: req.user._id });
    res.send(topic);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
