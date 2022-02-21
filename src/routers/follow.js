const express = require("express");
const User = require("../models/user");
const auth = require("../auth/auth");
const router = new express.Router();

// Follow User
router.patch("/user/follow/:userId", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $push: {
          follow: req.user._id,
        },
      }
    ).exec((error, result) => {
      if (error) {
        return res.status(404).send();
      } else {
        res.status(200).send(result);
      }
    });
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// Unfollow User
router.patch("/user/unfollow/:userId", auth, async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.params.userId },
      {
        $pull: { follow: req.user._id },
      },
      {
        new: true,
      }
    ).exec((error, result) => {
      if (error) {
        return res.status(404).send();
      } else {
        res.send(result);
      }
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
