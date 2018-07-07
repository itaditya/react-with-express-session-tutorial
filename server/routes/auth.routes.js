const express = require("express");
const router = express.Router();

const User = require("../models/User");

//POST route for updating data
router.post("/signup", (req, res, next) => {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    const err = new Error("Passwords do not match.");
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email && req.body.username && req.body.password) {
    const userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    };

    User.create(userData)
      .then(user => {
        req.session.userId = user._id;
        return res.send({
          message: "success"
        });
      })
      .catch(error => {
        if (error) {
          return next(error);
        }
      });
  } else {
    const err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

router.post("/login", (req, res, next) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, (err, user) => {
      if (!user) {
        const err = new Error("Password is incorrect");
        err.status = 400;
        return next(err);
      }
      req.session.userId = user._id;
      return res.send({
        message: "success"
      });
    });
  } else {
    const err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

// GET for logout logout
router.get("/logout", (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(err => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});

module.exports = router;
