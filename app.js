const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  Blogpost = require('./models/blogpost'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  methodOverride = require('method-override'),
  Comment = require('./models/comment'),
  User = require('./models/user'),
  seedDB = require('./seeds'),
  port = process.env.PORT || 3000;

//REQUIRING ROUTES
const commentRoutes = require('./routes/comments'),
  blogpostRoutes = require('./routes/blogposts'),
  indexRoutes = require('./routes/index');

//env var deployment || local
const url = process.env.DATABASEURL || 'mongodb://localhost/BlogApp';
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.set('view engine', 'ejs');
// seedDB(); seeds the database

//MomentJS used in all view files via var moment
app.locals.moment = require('moment');

//PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'this text can be anything',
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
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use('/', indexRoutes);
app.use('/blogposts/:id/comments', commentRoutes);
app.use('/blogposts', blogpostRoutes);

app.listen(port, process.env.IP, () =>
  console.log(`The server is running on port ${port}`)
);
