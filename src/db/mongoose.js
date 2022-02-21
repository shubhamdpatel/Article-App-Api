const mongoose = require("mongoose");

// Connection Creation and Creation a new DB
mongoose.connect("mongodb://127.0.0.1:27017/article-manager-api", {
  useNewUrlParser: true,
});
//   .then(() => {
//     console.log("Connection SuccessFull");
//   })
//   .catch((e) => {
//     console.log(e);
//   });
