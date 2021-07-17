{
    let addFriend = function(){
        $('#friend-button').on('click', function(e){
            let url = $('#friend-button-container > a').attr('href');
            // console.log(url);
            e.preventDefault();
            $.ajax({
                type: 'GET',
                url: url,
                success: function(data){
                    // console.log(data.data.message);
                    if(data.data.isFriend){
                        let newURL = $('#friend-button-container > a').attr('href').replace("add","remove");
                        $('#friend-button-container > a').attr('href', newURL);
                        $('#friend-button > span').text('Remove Friend');
                        $('#friend-button > i').attr('class', 'fas fa-user-times');
                    }else{
                        let newURL = $('#friend-button-container > a').attr('href').replace("remove","add");
                        $('#friend-button-container > a').attr('href', newURL);
                        $('#friend-button > span').text('Add Friend');
                        $('#friend-button > i').attr('class', 'fas fa-user-plus');
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