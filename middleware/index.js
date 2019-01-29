const Blogpost = require('../models/blogpost'),
  Comment = require('../models/comment');
// all middleware goes here

let middlewareObj = {};

middlewareObj.checkBlogpostOwnership = function(req, res, next) {
  //is user logged in?
  if (req.isAuthenticated()) {
    Blogpost.findById(req.params.id, function(err, foundBlogpost) {
      if (err || !foundBlogpost) {
        req.flash('error', 'Blogpost not found');
        res.redirect('back');
      } else {
        //does user own blogpost?
        if (foundBlogpost.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = function checkCommentOwnership(
  req,
  res,
  next
) {
  // is user logged in?
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err || !foundComment) {
        req.flash('error', 'comment not found');
        res.redirect('back');
      } else {
        // does user own the comment?
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', 'You do not have permission to do that');
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'You need to be logged in to do that!');
    res.redirect('/login');
  }
};

module.exports = middlewareObj;
