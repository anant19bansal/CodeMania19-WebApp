class LikePostsComments{
    constructor(type, typeId){
        this.type = type;
        this.typeId = typeId;
        this.likeElement;
        if(type == 'Post'){
            this.likeElement = $(`#post-${this.typeId} .like-buttons-post`);
        }else{
            this.likeElement = $(`#comment-${this.typeId} .like-buttons-comment`);
        }
        this.likeIt(this.likeElement);
    }

    likeIt(likeElement){
        let pself = this;
        // console.log(this);
        // console.log(pself);
        likeElement.find('a').on('click', function(e){
            e.preventDefault();
            let url = likeElement.find('a').prop('href');
            $.ajax({
                type: 'POST',
                url:url,
                success:function(data){
                    // console.log(data);
                    // console.log(pself.likeElement.find('.likes-count').text());
                    let count = pself.likeElement.find('.likes-count').text();
                    if(data.data.deleted){
                        count--;
                        pself.likeElement.find('.likes-count').text(count);
                        pself.likeElement.find('i').css('color','lightgrey');                        
                    }else{
                        count++;
                        pself.likeElement.find('.likes-count').text(count);
                        pself.likeElement.find('i').css('color','red');
                    }
                },
                error:function(err){
                    console.log("********Error in ajax function********");
                    console.log(err.responseText);
                }
            });
        });
    }
}