// ==UserScript== 
// @name       RYM ignore user 
// @version    2.1
// @match      http://rateyourmusic.com/board_message?* 
// @copyright  2012+, AnniesBoobs 
// ==/UserScript== 
function addUser(userId){
    if (usersPosted[userId] == 'AnniesBoobs'){
        alert('Get off my RYM, you bastard.');
        usersIgnore = usersIgnore.replace(usersPosted[userId]+',','');
    }
    else if (usersIgnore.indexOf(usersPosted[userId]+',') >= 0){
        usersIgnore = usersIgnore.replace(usersPosted[userId]+',','');
        posts = document.getElementsByClassName('authorinfo'); 
        for (i=0; i<posts.length; i++){
            username = posts[i].getElementsByClassName('usero');
            if (username[0] == undefined){username = posts[i].getElementsByClassName('user');}
            
            quotes = posts[i].parentNode.getElementsByClassName('quote');
            for (q=0; q<quotes.length; q++){
                if (quotes[q].firstChild.tagName == 'B' && quotes[q].firstChild.firstChild.innerHTML == usersPosted[userId]){
                    quotes[q].getElementsByTagName('blockquote')[0].style.display = '';
                }
            }
            
            if (username[0].innerHTML == usersPosted[userId]){
                x = username[0].parentNode.parentNode.getElementsByTagName('a');
                x[x.length-1].innerHTML = ' ignore';
                others = username[0].parentNode.parentNode.getElementsByTagName('*');
                for (x=4; x<(others.length-1); x++){
                    others[x].style.display = '';
                }
                if (posts[i] == undefined){alert('undefined');}
                postContent = posts[i].parentNode.getElementsByTagName('blockquote')[0];
                if (postContent != undefined){postContent.style.display = '';}
            }
        }
    }
    else{
        usersIgnore = usersIgnore+usersPosted[userId]+','; 
        posts = document.getElementsByClassName('authorinfo'); 
        for (i=0, j=posts.length; j>i; i++){
            username = posts[i].getElementsByClassName('usero');
            if (username[0] == undefined){username = posts[i].getElementsByClassName('user');}
            quotes = posts[i].parentNode.getElementsByClassName('quote');
            for (q=0; q<quotes.length; q++){
                if (quotes[q].firstChild.tagName == 'B' && quotes[q].firstChild.firstChild.innerHTML == usersPosted[userId]){
                    quotes[q].getElementsByTagName('blockquote')[0].style.display = 'none';
                }
            }
            if (username[0].innerHTML == usersPosted[userId]){
                x = username[0].parentNode.parentNode.getElementsByTagName('a');
                x[x.length-1].innerHTML = ' unignore';                
                others = username[0].parentNode.parentNode.getElementsByTagName('*');
                for (x=4; x<(others.length-1); x++){
                    others[x].style.display = 'none';
                }
                if (posts[i] == undefined){alert('undefined');}
                postContent = posts[i].parentNode.getElementsByTagName('blockquote')[0];
                if (postContent != undefined){postContent.style.display = 'none';}
            }
        }
    }
    GM_setValue('usersIgnore',usersIgnore);
}
var usersIgnore = GM_getValue('usersIgnore');
if (usersIgnore == undefined){
    usersIgnore = '';
}
var usersPosted = new Array();
posts = document.getElementsByClassName('authorinfo'); 
for (i=0, j=posts.length; j>i; i++){
    username = posts[i].getElementsByClassName('usero');
    
    if (username[0] == undefined){
        username = posts[i].getElementsByClassName('user');
    }
    
    ignoreButton = document.createElement('a');
    ignoreButton.setAttribute('href', 'javascript:void(0);');
    ignoreButton.innerHTML = ' ignore';
    posts[i].appendChild(ignoreButton);
    ignoreButton.addEventListener('click', (function(n) {
        return function (e) {
            e.preventDefault();
            addUser(n);
        };
    })(i), false);
    quotes = posts[i].parentNode.getElementsByClassName('quote');
    for (q=0; q<quotes.length; q++){
        if (quotes[q].firstChild.tagName == 'B' && usersIgnore.indexOf(quotes[q].firstChild.firstChild.innerHTML+',') >= 0){
            quotes[q].getElementsByTagName('blockquote')[0].style.display = 'none';
        }
    }
    
    usersPosted.push(username[0].innerHTML);
    if (usersIgnore.indexOf(username[0].innerHTML+',') >= 0){
        ignoreButton.innerHTML = ' unignore';
        others = username[0].parentNode.parentNode.getElementsByTagName('*');
        for (x=4; x<(others.length-1); x++){
            others[x].style.display = 'none';
        }
        if (posts[i] == undefined){alert('undefined');}
        postContent = posts[i].parentNode.getElementsByTagName('blockquote')[0];
        if (postContent != undefined){postContent.style.display = 'none';}
    }
}
