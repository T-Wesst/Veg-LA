var express = require('express');
var router = express.Router();
var Blogpost = require('../models/blogpost');
var middleware = require('../middleware/index');


//INDEX ROUTE - show all blogposts
router.get('/', function(req, res) {
    //Get all blogposts from DB
    Blogpost.find({}, function(err, allBlogposts){
        if(err){
            console.log(err);
        } else {
            res.render('blogposts/index', {blogposts: allBlogposts, page: 'blogposts'});
        }
    });
});

//CREATE ROUTE - add new post to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
    //get data from form and add to blogposts array
    var title = req.body.title;
    var image = req.body.image;
    var body = req.body.body;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBlogpost = {title: title, image: image, body: body, price: price, author: author};
    //create a new blogpost and save to db
    Blogpost.create(newBlogpost, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to blogposts page
            console.log(newlyCreated);
            res.redirect('/blogposts');
        }
    });
});

//NEW - show form to create new post
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('blogposts/new');
});

//SHOW - show more info about one post
router.get('/:id', function(req, res) {
    //find blogpost with provided ID
    Blogpost.findById(req.params.id).populate('comments').exec(function(err, foundBlogpost){
        if(err || !foundBlogpost){
            req.flash('error', 'blogpost not found');
            console.log(err);
            res.redirect('back');
        } else {
            //render show emplate with that blogpost
            res.render("blogposts/show", {blogpost: foundBlogpost});
        }
    });
});

//EDIT Blogpost ROUTE
router.get('/:id/edit', middleware.checkBlogpostOwnership, function(req, res){
        Blogpost.findById(req.params.id, function(err, foundBlogpost){
            res.render('blogposts/edit', {blogpost: foundBlogpost});
        });
});
//UPDATE Blogpost ROUTE
router.put('/:id', middleware.checkBlogpostOwnership, function(req, res){
    //find and update correct POST
    Blogpost.findByIdAndUpdate(req.params.id, req.body.blogpost, function(err, updateBlogpost){
        if(err){
            res.redirect('/blogposts');
        } else {
            //redirect show page
            res.redirect('/blogposts/' + req.params.id);
        }
    });
});

//DESTROY BLOGPOST Rout
router.delete('/:id', middleware.checkBlogpostOwnership, function(req, res){
    Blogpost.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/blogposts');
        } else {
            res.redirect('/blogposts');
        }
    });
});

module.exports = router;
