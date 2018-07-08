const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    const error = new Error("userId not provided");
    error.status = 401;
    return next(error);
  }
  return next();
};

module.exports = isAuthenticated;
