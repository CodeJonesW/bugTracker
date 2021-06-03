const User = require("../models/User");

let userId = "60b8dd94452065401957a486";
const db = require("../config/connection");

db.once("open", () => {
  User.findById(userId)
    .then((user) => {
      const bug = user.bugsReported.push({
        title: "scary bug",
        description: "this is a big bug",
      });

      console.log("here", bug);

      return user.save(); // saves document with subdocuments and triggers validation
    })
    .then((user) => {
      console.log({ user });
    })
    .catch((e) => console.log(e));
});
