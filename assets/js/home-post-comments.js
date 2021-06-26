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
        $(' .delete-comment-button', this.postContainer).each(function(){
            self.deleteComment($(this));
        });
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
                    $(`#post-comments-${postId}`).prepend(newComment);
                    // console.log(pSelf);
                    // console.log(newComment);
                    // console.log($(' .delete-comment-button'));
                    // console.log($(' .delete-comment-button', newComment));
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

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
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${ comment.Id }">
                    <p>
                        ${ comment.content }
                        <br>
                        <small>${ comment.name }</small>
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${ comment.Id}">X</a>
                        </small> 
                    </p>
                </li>`);
    }


    deleteComment(deleteLink){
        // console.log('here at delete');
        $(deleteLink).click(function(e){
            // console.log('preventing default delete');
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    // console.log(data);
                    // console.log($(`#comment-${data.data.comment_id}`));
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
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