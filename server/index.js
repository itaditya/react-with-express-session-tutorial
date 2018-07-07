require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");

const routes = require("./routes/index.routes");

const MongoStore = require("connect-mongo")(session);
const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

//handle mongo error
db.on("error", () => console.error("Error in DB connection"));
db.once("open", function() {
  console.log("DB connected");
});

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", routes);

app.get("/", function(req, res) {
  res.send({
    message: "Server is running"
  });
});

app.get("/api/stats", (req, res) => {
  let pageViews = req.session.page_views || 0;
  pageViews += 1;
  req.session.page_views = pageViews;
  res.send({ pageViews });
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
