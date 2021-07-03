// Just in case anyone is wondering if you want to populate several paths you can pass in arrays of objects as such : .populate([ { path: 'path_1', populate: { path: 'field_1' } }, { path: 'path_2', populate: [{ path: 'field_1' }, { path: 'field_2' }] } ]).exec(). Also note that giving simple strings in the array will not work as it usually does. Use { path: 'field' } structure instead.

const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req, res){
    try {
            
        let posts = await Post.find({})
        .sort('-createdAt')                       // to sort the posts in order of latest created
        .populate('user')
        .populate('likes')
        .populate({
            path:'comments',
            populate: [{path: 'likes'}, {path: 'user'}]
        });
        let users = await User.find({});
        // console.log(users);
        let friends = [];
        if(req.user){
            let u = await User.findById(req.user._id)
            .populate({path: 'friendships', populate:[{path: 'from_user'},{path: 'to_user'}]});
            // console.log(user.friendships);
            for(f of u.friendships){
                if(f.from_user.id != u.id){
                    friends.push(f.from_user);
                }else{
                    friends.push(f.to_user);
                }
            }
        }
        
        // console.log(friends);
        return res.render('home',{
            title:"Home",
            posts: posts,
            all_users: users,
            friends: friends,
        });

    } catch (err) {
        console.log("Error: ", err);
        return;
    }
};


// module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('id','25');

    // return res.render('home',{
    //     title:"Home",
    //     all_posts: posts,
    // });


    // return res.end('<h1>Express is up for Codeial! </h1>');


    // Post.find({}, function(err, posts){
    //     if(err){console.log('err in finding the posts'); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts,
    //     });
    // });

    // Post.find({}).populate('user').exec(function(err, posts){
    //     if(err){console.log('err in finding the posts'); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts,
    //     });
    // });

    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate: {
    //         path:'user',
    //     },
    // })
    // .exec(function(err, posts){
    //     if(err){console.log('err in finding the posts'); return;}
    //     return res.render('home',{
    //         title:"Home",
    //         posts: posts,
    //     });
    // });
    //     Post.find({})
    //     .populate('user')
    //     .populate({
    //         path:'comments',
    //         populate: {
    //             path:'user',
    //         },
    //     })
    //     .exec(function(err, posts){

    //         User.find({}, function(err, users){
    //             if(err){console.log('err in finding the posts'); return;}
    //             return res.render('home',{
    //                 title:"Home",
    //                 posts: posts,
    //                 all_users: users,
    //             });
    //         });
    //     });
// };





// deep nested population method

// .populate([ 
//     { 
//         path: 'path_1', 
//         populate: { 
//             path: 'field_1' 
//         } 
//     }, 
//     { path: 'path_2', 
//         populate: [
//             { path: 'field_1' }, 
//             { path: 'field_2' }
//         ] 
//     } 
// ]).exec()

