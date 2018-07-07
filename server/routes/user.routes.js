const router = require("express").Router();

const User = require("../models/User");

// GET route after registering
router.get("/profile", (req, res, next) => {
  if (!req.session.userId) {
    console.count("userId not provided");
    const err = new Error("userId not provided");
    err.status = 401;
    return next(err);
  }
  User.findById(req.session.userId).exec((error, user) => {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        const err = new Error("Not authorized");
        err.status = 400;
        return next(err);
      } else {
        const userData = {
          email: user.email,
          username: user.username
        };
        res.send(userData);
      }
    }
  });
});

module.exports = router;
