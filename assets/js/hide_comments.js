{
    let posts = $('.posts-list-container .posted-post-container .post-comments-list');
    let buttons = $('.comments-icon-container');
    for(let i = 0; i<posts.length; i++){
        $(buttons[i]).click(function(){
            if (posts[i].style.display == "none") {
                posts[i].style.display = "block";
            } else {
                posts[i].style.display = "none";
            }
        });
    }
}