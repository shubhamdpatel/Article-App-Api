const mongoose = require("mongoose");

const topicSchema = mongoose.Schema(
  {
    topicName: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { updatedAt: false } }
);

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
