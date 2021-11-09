require("dotenv").config();

var createError = require("http-errors");
var express = require("express");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users/usersRouter");
// var moviesRouter = require("./routes/movies/moviesRouter");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("");
    console.log("         [On Port 3001] ");
    console.log("");
    console.log("     ^^^^^            ^^^^^    ");
    // console.log("");
    console.log("     [Con]            [noC]");
    console.log("     [nEc]            [cEn]");
    console.log("     [ted]            [det]");
    console.log("");
    console.log("              [OO]         ");
    console.log("             [G  G]        ");
    console.log("            [N    N]       ");
    console.log("             [O  O]                ");
    console.log("              [MM]               ");
    console.log("     [                    ]   ");
    console.log("      D_                _D    ");
    console.log("        B_{WE ARE UP!}_B    ");
    console.log("    ");
    console.log('       "Hack The Planet!"          ');
    console.log("");
  })
  .catch((err) => console.error(err));

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
// app.use("/api/movies", moviesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: "Error",
    err: err.message,
  });
});

module.exports = app;
