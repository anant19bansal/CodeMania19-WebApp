const Post = require('../models/posts');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('id','25');

    // Post.find({}, function(err, posts){
    //     if(err){console.log('err in finding the posts'); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts,
    //     });
    // });

    Post.find({}).populate('user').exec(function(err, posts){
        if(err){console.log('err in finding the posts'); return;}
        return res.render('home',{
            title:"Home",
            posts: posts,
        });
    });

    // return res.render('home',{
    //     title:"Home",
    //     all_posts: posts,
    // });


    // return res.end('<h1>Express is up for Codeial! </h1>');
};