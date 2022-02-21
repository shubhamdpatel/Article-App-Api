var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      minLength: 5,
      required: true,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Articles",
    },
    CommentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { updatedAt: false } }
);

module.exports = mongoose.model("Comment", commentSchema);
