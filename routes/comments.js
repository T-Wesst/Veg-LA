const express = require('express'),
  router = express.Router({ mergeParams: true }),
  Blogpost = require('../models/blogpost'),
  Comment = require('../models/comment'),
  middleware = require('../middleware/index');

//COMMENTS NEW
router.get('/new', middleware.isLoggedIn, function(req, res) {
  //find blogpost by id
  Blogpost.findById(req.params.id, function(err, blogpost) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', { blogpost: blogpost });
    }
  });
});

//COMMENTS CREATE
router.post('/', middleware.isLoggedIn, function(req, res) {
  //lookup blogpost using ID
  Blogpost.findById(req.params.id, function(err, blogpost) {
    if (err) {
      console.log(err);
      res.redirect('/blogposts');
    } else {
      //create new comment
      Comment.create(req.body.comment, function(err, comment) {
        if (err) {
          req.flash('error', 'Something went wrong');
          console.log(err);
        } else {
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();
          //connect new comment to blogpost
          blogpost.comments.push(comment);
          blogpost.save();
          console.log(comment);
          //redirect to blogpost show page
          req.flash('success', 'Successfully added comment');
          res.redirect(`/blogposts/${blogpost._id}`);
        }
      });
    }
  });
});

// Comment edit route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(
  req,
  res
) {
  Blogpost.findById(req.params.id, function(err, foundBlogpost) {
    if (err || !foundBlogpost) {
      req.flash('error', 'No blogpost found');
      return res.redirect('back');
    }
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        res.redirect('back');
      } else {
        res.render('comments/edit', {
          blogpost_id: req.params.id,
          comment: foundComment
        });
      }
    });
  });
});

//COMMENT UPDATE ROUTE
router.put('/:comment_id', middleware.checkCommentOwnership, function(
  req,
  res
) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    err,
    updatedComment
  ) {
    if (err) {
      res.redirect('backl');
    } else {
      res.redirect('/blogposts/' + req.params.id);
    }
  });
});

//COMMENT DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, function(
  req,
  res
) {
  //find by id and remove
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect('back');
    } else {
      //same as back
      req.flash('success', 'Comment deleted');
      res.redirect(`/blogposts/${req.params.id}`);
    }
  });
});

module.exports = router;
