const express = require("express");
const Article = require("../models/article");
const auth = require("../auth/auth");
// const Comment = require("../models/comment");
const router = new express.Router();

// Post Comment
router.post("/article/comment/:id", auth, async (req, res) => {
  try {
    //Find article
    const result = await Article.findById(req.params.id);
    if (!result) return res.send("Article id is not defined");

    //Check length
    // if (!req.body.comment) return res.send("please enter the comment field");

    const comments = {
      text: req.body.comment,
      postedBy: req.user._id,
    };

    //Update in Article
    const update = await Article.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comments },
      },
      { new: true }
    );

    // // Save Comment
    // const comment = new Comment({
    //   comment: req.body.comment,
    //   articleId: result._id,
    //   CommentBy: req.user,
    // });

    const result1 = await Article.findById(req.params.id);

    // await comment.save();
    res.status(201).send({
      comment: {
        commentMsg: req.body.comment,
        article: result1,
      },
    });
  } catch (error) {
    res.status(400).send({ error: "Article not found!!!" });
  }
});

module.exports = router;
