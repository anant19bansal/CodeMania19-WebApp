{
    // console.log('hello');

    // method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type :'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    // console.log(newPost);
                    // console.log($(' .delete-post-button', newPost));
                    deletePost($(' .delete-post-button', newPost));
                    new PostComments(data.data.post.Id);
                    new LikePostsComments('Post', data.data.post.Id);
                    new Noty({
                        theme: 'relax',
                        text: "Post is published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show();
                    

                },
                error: function(error){
                    console.log(error.responseText);
                },
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post.Id }">
                    <p>
                        ${ post.content }<br>
                        <small>${ post.name }</small>
                    </p>

                    <small class="like-buttons-post">
                        <div><span class="likes-count">0</span><span>&nbsp;Likes</span></div>
                        <a href="/likes/toggle/?id=${post.Id}&type=Post"><i class="fas fa-heart" style="color: lightgrey;"></i></a>
                    </small><br>
                
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${ post.Id }">X</a>
                        </small>    
                
                    <div class="post-comments">
                            <form action="/comments/create" id="new-comment-form-${post.Id}" method="POST">
                                <input type="text" name="content" placeholder="Write Your Comment here..." required>
                                <input type="hidden" name="post" value="${ post.Id }">
                                <input type="submit" value="Add Comment">
                            </form>
                        <div class="post-comments-list">
                            <ul id="post-comments-${ post.Id }">
                            </ul>
                        </div>        
                    </div>
                </li>`);
    }

    //method to delete a post;
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: "get",
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post and associated comments are deleted successfuly",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500,
                    }).show();
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1];
            new PostComments(postId);
            new LikePostsComments('Post', postId);
        });
    }

    createPost();
    convertPostsToAjax();

    // //ajax request for deleting applied to all delete buttons
    // let lists = $('#posts-list-container >ul>li');
    // for(let i=0; i<lists.length; i++){
    //     deletePost($(' .delete-post-button', lists[i]));
    // }
}