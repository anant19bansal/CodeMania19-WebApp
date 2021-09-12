class PostComments{
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId){
        // console.log('constructor called');
        // console.log(postId);
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        // console.log(this.postContainer);
        this.newCommentForm = $(`#new-comment-form-${postId}`);
        // console.log(this.newCommentForm);
        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        // console.log($(' .delete-comment-button', this.postContainer));
        // console.log($(this));
        // console.log($(' .delete-comment-button a', this.postContainer));
        $(' .delete-comment-button a', this.postContainer).each(function(){
            self.deleteComment($(this));
        });

        $(' .post-comments-list > ul > li', this.postContainer).each(function(){
            let self = $(this);
            let commentId = self.prop('id').split("-")[1];
            new LikePostsComments('Comment', commentId);
        })
    }


    createComment(postId){
        // console.log('Inside createComment');
        let pSelf = this;
        this.newCommentForm.submit(function(e){
            // console.log('preventing default');
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data){
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).append(newComment);
                    $(`#new-comment-form-${postId} > input`).val('');
                    let count = pSelf.postContainer.find('.comments-count').text();
                    count++;
                    pSelf.postContainer.find('.comments-count').text(count);
                    // console.log(newComment);
                    // console.log($(' .delete-comment-button'));
                    // console.log($(' .delete-comment-button', newComment));
                    pSelf.deleteComment($(' .delete-comment-button a', newComment), pSelf.postContainer.find('.comments-count'));
                    new LikePostsComments('Comment', data.data.comment.Id);
                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();

                }, 
                error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }


    newCommentDom(comment){
        return $(`<li class="comments-container" id="comment-${ comment.Id }">

                    <div class="comment-box">
                        <div class="commenter-name">${ comment.name }</div>
                        <div class="comment-content">${ comment.content }</div>
                    </div>
                    
                    <span class="like-buttons-comment">
                        <small> 
                            <a href="/likes/toggle/?id=${comment.Id}&type=Comment "><i class="fas fa-heart" style="color: lightgrey;"></i></a>
                            <span class="likes-count">0</span>
                        </small>
                    </span>
                    <small>
                        <span class="delete-comment-button">
                            <a href="/comments/destroy/${comment.Id}">Delete</a>
                        </span>
                    </small>
                    
                </li>`);
    }


    deleteComment(deleteLink, ele){
        // console.log(`here at delete  with link:  ${$(deleteLink).prop('href')}`);
        $(deleteLink).click(function(e){
            // console.log('preventing default delete');
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    // console.log(data);
                    // console.log(`#comment-${data.data}`);
                    $(`#comment-${data.data.comment_id}`).remove();
                    let count = ele.text();
                    count--;
                    ele.text(count);

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error: function(error){
                    console.log(`This is the generated error:    ${error.responseText}`);
                }
            });

        });
    }
}











// {
//     console.log("I am on");

//     let createComment = function(){
//         let commentForm = $('.new-comment-form');
//         for(i of commentForm){
//             i.submit(function(e){
//                 e.preventDefault();
    
//                 $.ajax({
//                     type: 'post',
//                     url: '/comments/create',
//                     data: i.serialize(),
//                     success: function(data){
//                         let newComment = createCommentDom(data.data.comment);
//                         $(`#post-comments-${ data.data.comment.postId }`).append(newComment);
//                     },
//                     error: function(error){
//                         console.log(error.responseText);
//                     }
//                 });
//             });
//         }
//     };

    // let createCommentDom = function(comment){
    //     return $(`<li>
    //                 <p>
    //                     ${ comment.content }
    //                     <br>
    //                     <small>${ comment.name }</small>
    //                     <small>
    //                         <a href="/comments/destroy/${ comment.Id}">X</a>
    //                     </small> 
    //                 </p>
    //             </li>`);
    // }

// //     // let deleteComment = function(){

// //     // };

//     createComment();
// }