var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var Blogpost = require("./models/blogpost");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");

//REQUIRING ROUTES
var commentRoutes = require("./routes/comments");
var blogpostRoutes = require("./routes/blogposts");
var indexRoutes = require("./routes/index");

//env var deployment || local
var url = process.env.DATABASEURL || "mongodb://localhost/BlogApp";
mongoose.connect(url);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
// seedDB(); seeds the database

//MomentJS used in all view files via var moment
app.locals.moment = require("moment");

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "this text can be anything",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware called on every route and template
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/blogposts/:id/comments", commentRoutes);
app.use("/blogposts", blogpostRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function() {
  console.log("The BlogApp server has started!");
});
