// ==UserScript==
// @name        Achaea forums ignore script
// @namespace   http://userscripts.org
// @description Blocks posts, quotes and reactions from specified users on the Achaean forums
// @include     http://forums.achaea.com/discussion/*
// @version     5
// @grant       none
// ==/UserScript==
//add a person to this list, enclosing their name with "" and ending with ,
var userlist = [
    'Flowerpot',
];
    
var postsToDelete = document.getElementsByClassName('ItemComment');
    
for (i = 0; i < postsToDelete.length; i++)
{
    var post = postsToDelete[i]
    var username = post.querySelector('.Username').innerHTML;

    if (userlist.indexOf(username) >= 0)
    {
        post.className += ' Buried';
        
        var author_info = post.querySelector('.AuthorLocation');
        if (author_info !== null) 
        {
            author_info.innerHTML = '';
        }
        
    }
}
