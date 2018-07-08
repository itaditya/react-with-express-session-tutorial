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

UserSchema.statics.authenticate = function(email, password) {
  const User = this;
  const p = new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          const error = new Error("User not found.");
          error.status = 401;
          return reject(error);
        }
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            return reject(error);
          }

          const isPasswordMatch = result;
          if (!isPasswordMatch) {
            const error = new Error("Password is incorrect");
            error.status = 401;
            return reject(error);
          }
          return resolve(user);
        });
      })
      .catch(reject);
  });
  return p;
};

//hashing a password before saving it to the database
UserSchema.pre("save", function(next) {
  const user = this;
  bcrypt.hash(user.password, null, null, (error, hash) => {
    if (error) {
      return next(error);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
