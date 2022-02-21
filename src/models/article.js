const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    articleName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    topic: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      maxLength: 500,
      required: true,
    },
    comments: [
      {
        text: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Articles", articleSchema);
module.exports = Article;
