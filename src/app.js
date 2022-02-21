const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const topicRouter = require("./routers/topic");
const articleRouter = require("./routers/article");
const commentRouter = require("./routers/comment");
const followRouter = require("./routers/follow");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(topicRouter);
app.use(articleRouter);
app.use(commentRouter);
app.use(followRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
