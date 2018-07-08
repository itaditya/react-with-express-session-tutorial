const express = require("express");
const router = express.Router();

const User = require("../models/User");

//POST route for updating data
router.post("/signup", (req, res, next) => {
  const { email, username, password, passwordConf } = req.body;
  // confirm that user typed same password twice
  if (password !== passwordConf) {
    const error = new Error("Passwords do not match.");
    error.status = 400;
    res.send("Passwords don't match");
    return next(error);
  }

  if (!email || !username || !password) {
    const error = new Error("All fields required.");
    error.status = 400;
    return next(error);
  }

  const userData = { email, username, password };
  User.create(userData)
    .then(user => {
      req.session.userId = user._id;
      const userResponseData = { email, username };
      return res.send({
        message: "success",
        data: userResponseData
      });
    })
    .catch(next);
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("All fields required.");
    error.status = 400;
    return next(error);
  }
  User.authenticate(email, password)
    .then(user => {
      if (!user) {
        const error = new Error("Password is incorrect");
        error.status = 400;
        return next(error);
      }
      req.session.userId = user._id;
      const userResponseData = {
        email,
        username: user.username
      };
      return res.send({
        message: "success",
        data: userResponseData
      });
    })
    .catch(next);
});

// GET for logout logout
router.get("/logout", (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(error => {
      if (error) {
        return next(error);
      }
      return res.send({
        message: "success"
      });
    });
  }
});

module.exports = router;
