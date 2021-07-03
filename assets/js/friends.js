{
    let addFriend = function(){
        let url = $('#friend-button-container > a').prop('href');
        $('#friend-button').on('click', function(e){
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data){
                    // console.log(data.data.message);
                    if(data.data.isFriend){
                        $('#friend-button').text('Remove Friend');
                    }else{
                        $('#friend-button').text('Add Friend');
                    }
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        })
    };

    

    addFriend();
}