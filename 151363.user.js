// ==UserScript== 
// @name       RYM: Ignore User; Review Edition
// @version    0.1
// @include      http://rateyourmusic.com/release/* 
// @include      http://rateyourmusic.com/film/* 
// @copyright  2012+, AnniesBoobs 
// ==/UserScript== 

function addUser(userId){
    if (usersPosted[userId] == 'AnniesBoobs'){
        alert('I\'m sorry, Dave. I\'m afraid I can\'t do that.');
        usersIgnore = usersIgnore.replace(usersPosted[userId]+',','');
    }
    else if (usersIgnore.indexOf(usersPosted[userId]) >= 0){
        usersIgnore = usersIgnore.replace(usersPosted[userId]+',','');
    }
    else{
        usersIgnore = usersIgnore+usersPosted[userId]+','   
            }
    GM_setValue('usersIgnoreReview',usersIgnore);
    document.location.reload();
}

var usersIgnore = GM_getValue('usersIgnoreReview');
if (usersIgnore == undefined){
    usersIgnore = '';
}
var usersPosted = new Array();
posts = document.getElementsByClassName('reviewbox'); 
for (i=0, j=posts.length; j>i; i++){
    username = posts[i].getElementsByClassName('usero');
    
    if (username[0] == undefined){
        username = posts[i].getElementsByClassName('user');
        
        ignoreButton = document.createElement('a');
        x = document.createElement('a');
        x.innerHTML = '   ';
        ignoreButton.setAttribute('href', 'javascript:void(0);');
        ignoreButton.innerHTML = 'ignore';
        username[0].parentNode.insertBefore(ignoreButton, username[0].nextSibling);
        username[0].parentNode.insertBefore(x, username[0].nextSibling);
        
        ignoreButton.addEventListener('click', (function(n) {
            return function (e) {
                e.preventDefault();
                addUser(n);
            };
        })(i), false);
        
        usersPosted.push(username[0].innerHTML);
        if (usersIgnore.indexOf(username[0].innerHTML) >= 0){
            ignoreButton.innerHTML = 'unignore';
            if (posts[i] == undefined){alert('undefined');}
            postContent = posts[i].getElementsByClassName('reviewboxinner')[0];
            if (postContent != undefined){postContent.parentNode.removeChild(postContent);}
        }
    }
    else{
        
        ignoreButton = document.createElement('a');
        x = document.createElement('a');
        x.innerHTML = '   ';
        ignoreButton.setAttribute('href', 'javascript:void(0);');
        ignoreButton.innerHTML = 'ignore';
        username[0].parentNode.insertBefore(ignoreButton, username[0].nextSibling);
        username[0].parentNode.insertBefore(x, username[0].nextSibling);
        
        
        
        ignoreButton.addEventListener('click', (function(n) {
            return function (e) {
                e.preventDefault();
                addUser(n);
            };
        })(i), false);
        
        usersPosted.push(username[0].innerHTML);
        
        
        if (usersIgnore.indexOf(username[0].innerHTML) >= 0){
            ignoreButton.innerHTML = 'unignore';
            if (posts[i] == undefined){alert('undefined');}
            postContent = posts[i].getElementsByClassName('reviewboxinner')[0];
            if (postContent != undefined){postContent.parentNode.removeChild(postContent);}
        }
    }
}