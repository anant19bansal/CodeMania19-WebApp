function sendData(e){
    // let searchForm = $('#search-form');
    // console.log(searchForm);
    const searchResults = document.getElementById('searchresults');
    let match = e.value.match(/^[a-zA-Z0-9 ]*/);
    let match2 = e.value.match(/\s*/);
    if(match2[0]===e.value){
        searchResults.innerHTML = '';
        return;
    }
    if(match[0]===e.value){
        $.ajax({
            type: 'POST',
            url:'/users/search',
            'Content-Type': 'application/json',
            data: {payload: e.value},
            success: function(data){
                console.log(data);
                let payload = data.payload;
                searchResults.innerHTML = '';
                if(payload.length < 1){
                    searchResults.innerHTML = `<p style="text-align:center; margin:14px">No search results found</p>`
                }
                payload.forEach((item, index) => {
                    if(index>0) searchResults.innerHTML += '<hr>';
                    if(item.avatar){
                        searchResults.innerHTML += `<a href="/users/profile/${item._id}">
                            <div class="search-item"><div><img src="${item.avatar}"></div><div class="search-result-name">${item.name}</div></div>
                        </a>`
                    }else{
                        searchResults.innerHTML += `<a href="/users/profile/${item._id}">
                            <div class="search-item"><div><img src="/images/default-avatar.jpg"></div><div class="search-result-name">${item.name}</div></div>
                        </a>`
                    }
                });
            }
        });
        return;
    }
    searchResults.innerHTML = '';
}