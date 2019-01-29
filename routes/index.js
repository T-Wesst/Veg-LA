const express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  User = require('../models/user');

//ROOT ROUTE
router.get('/', (req, res) => {
  res.render('landing');
});

//SHOW register form
router.get('/register', (req, res) => {
  res.render('register', { page: 'register' });
});

//handle register form
router.post('/register', function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register', { error: err.message });
    } else {
      passport.authenticate('local')(req, res, function() {
        req.flash('success', `Welcome to Veg-LA ${user.username}`);
        res.redirect('/blogposts');
      });
    }
  });
});

//SHOW login form
router.get('/login', (req, res) => {
  res.render('login', { page: 'login' });
});

//handle login from logic
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', `Welcome back ${user.username}!`);
      res.redirect('/blogposts');
    });
  })(req, res, next);
});

// logout ROUTE

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You have successfully logged out');
  res.redirect('/blogposts');
});

module.exports = router;
