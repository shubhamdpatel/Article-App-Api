const express = require("express");
const Article = require("../models/article");
const Topic = require("../models/topic");
const User = require("../models/user");
const auth = require("../auth/auth");
const router = new express.Router();

//Create article by using selected topic
router.post("/article/:topicname", auth, async (req, res) => {
  try {
    // Check correct topic
    const name = req.params.topicname;
    const topic = await Topic.find({ name });

    // check topic is available or not
    if (topic.length == 0) {
      console.log("Topic_Name", topic);
      return res.status(404).send({ error: "Topic name not found !" });
    }

    // check article is available or not
    const result = await Article.findOne({ articleName: req.body.articleName });
    if (result)
      return res.send({ error: "This Article Name Alredy Exits !!!" });

    const article = new Article({
      articleName: req.body.articleName,
      topic: name,
      content: req.body.content,
      createdBy: req.user._id,
    });

    try {
      await article.save();
      res.status(201).send({ msg: "Article Created Sucessfully", article });
    } catch (e) {
      res.status(400).send({ msg: "Article Creation Failed !!", e });
    }
  } catch (e) {
    return res
      .status(404)
      .send({ error: "Something wrong make sure pass correct type value !!!" });
  }
});

// Get All articles
router.get("/articles", auth, async (req, res) => {
  try {
    const article = await Article.find({});
    res.send(article);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// Get articles by topic
router.get("/articles/:topicname", auth, async (req, res) => {
  const tname = req.params.topicname;

  try {
    const article = await Article.find({ topic: tname });
    console.log(article);
    if (article == "")
      return res
        .status(404)
        .send({ Msg: `${tname} topic is not found in article.` });
    res.send(article);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

//  get most recent article
router.get("/article/recent", async (req, res) => {
  try {
    const article = await Article.find({}).sort({ createdAt: -1 }).limit(1);
    res.send(article);
  } catch (e) {
    res.status(500).send();
  }
});

// Get articles by following
router.get("/following/articles", auth, async (req, res) => {
  const users = [];
  const articleData = [];
  let data;
  const following = await User.find({ follow: req.user._id });
  following.map((user) => {
    users.push(user._id);
  });
  for (user in users) {
    data = await Article.find({ createdBy: users[user] });
    articleData.push(data);
  }
  res.send(articleData);
});

// Update
router.patch("/article/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["articleName", "content", "topic"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const article = await Article.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!article) {
      return res.status(404).send({ error: "Article Not Found" });
    }

    updates.forEach((update) => (article[update] = req.body[update]));
    await article.save();

    res.send({
      Msg: "Article Updated Sucessfully !!!",
      UpdatedArticle: article,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete
router.delete("/article/:id", auth, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!article) {
      res.status(404).send({ error: "Article Not Found" });
    }

    res.send({
      Msg: "Article Deleted Sucessfully !!!",
      DeletedArticle: article,
    });
  } catch (error) {
    res.status(500).send({ error: "Something wents wrong.", error });
    console.log(error);
  }
});

module.exports = router;
