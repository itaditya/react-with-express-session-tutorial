const router = require("express").Router();

const isAuthenticatedMw = require("../middlewares/isAuthenticated.mw");
const User = require("../models/User");

// GET route after registering
router.get("/profile", isAuthenticatedMw, (req, res, next) => {
  User.findById(req.session.userId)
    .then(user => {
      if (!user) {
        const error = new Error("Not authorized");
        error.status = 400;
        return next(error);
      }
      const userData = {
        email: user.email,
        username: user.username
      };
      res.send(userData);
    })
    .catch(next);
});

module.exports = router;
