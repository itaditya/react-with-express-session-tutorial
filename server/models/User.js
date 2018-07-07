const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

//authenticate input against database
UserSchema.statics.authenticate = function(email, password, callback) {
  const User = this;
  User.findOne({ email }).exec((err, user) => {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      result ? callback(null, user) : callback();
    });
  });
};

//hashing a password before saving it to the database
UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model("User", UserSchema);
module.exports = User;
