var mongoose = require('mongoose');
var Blogpost = require('./models/blogpost');
var Comment = require('./models/comment');
var data = [
    {
        title: 'MERN STACK',
        image: 'http://adsvento.in/images/react/mernstack.png',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'MEAN STACK',
        image: 'https://cdn-images-1.medium.com/max/640/1*kkXbE9GlS73U7x1iXHP_vQ.png',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
        title: 'REACT REDUX',
        image: 'https://cdn-images-1.medium.com/max/800/1*HBoFpeOTCuIDQMKsSpYN7A.png',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
];

function seedDB(){
    //remove all blogposts
    Blogpost.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log('removed blogposts!');
            //add few blogposts
            data.forEach(function(seed){
                Blogpost.create(seed, function(err, blogpost){
                    if(err){
                        console.log(err);
                    } else {
                        console.log('added a blogpost');
                        //create a comment
                        Comment.create(
                            {
                                text: 'this post is awesome',
                                author: 'User'
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    blogpost.comments.push(comment);
                                    blogpost.save();
                                    console.log('created new comment');
                                }
                            });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
