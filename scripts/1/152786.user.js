// ==UserScript== 
// @name       RYM: Ignore users on the message boards; Kitten Edition
// @version    2.4
// @match      http://rateyourmusic.com/board_message?* 
// @match      https://rateyourmusic.com/board_message?* 
// @copyright  2012+, AnniesBoobs 
// ==/UserScript== 
function addUser(userId){
    if (usersPosted[userId] == 'BruceWayne'){
        alert('Logging you out now.');
        window.location.href = "https://rateyourmusic.com/account/logout";
        usersIgnore = usersIgnore.replace(usersPosted[userId]+',','');
    }
    else if (usersIgnore.indexOf(usersPosted[userId]+',') >= 0){
        usersIgnore = usersIgnore.replace(usersPosted[userId]+',','');
        posts = document.getElementsByClassName('authorinfo'); 
        kittens = document.getElementsByClassName(usersPosted[userId]+'Ignore');
        for (k=0; k<kittens.length; k++){kittens[k].style.display = 'none'}
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
                x[x.length-1].innerHTML = ' ignore user';
                x[x.length-1].className = 'smallgray';
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
                x[x.length-1].innerHTML = ' unignore user';
 				x[x.length-1].className = 'smallgray';                
                others = username[0].parentNode.parentNode.getElementsByTagName('*');
                for (x=4; x<(others.length-1); x++){
                    others[x].style.display = 'none';
                }
                if (posts[i] == undefined){alert('undefined');}
                postContent = posts[i].parentNode.getElementsByTagName('blockquote')[0];
                if (postContent != undefined){
                    postContent.style.display = 'none';
                    
                    x = document.createElement('img');
                    ki = Math.floor(Math.random()*kittenImages.length);
                    x.src = kittenImages[ki];
                    x.height = 200;
                    x.className = username[0].innerHTML+'Ignore';
                    postContent.parentNode.appendChild(x);
                }
            }
        }
    }
    GM_setValue('usersIgnore',usersIgnore);
}

kittenImages = ['http://static.rateyourmusic.com/lk/l/w/e98ee6e8efda3ebf256356a61753597e/378774.jpg', 'http://static.rateyourmusic.com/lk/l/w/a9482d38b38acb24f703ad40f30a6ac4/790152.jpg', 'http://static.rateyourmusic.com/lk/l/w/1adb555b79c3c7997fe163da9680e063/790154.jpg', 'http://static.rateyourmusic.com/lk/l/w/b687970b5c770db630786c2479ee38f9/790155.jpg', 'http://static.rateyourmusic.com/lk/l/w/4b9cd3dbfde8f4618e94a8d03fa52773/4467410.jpeg', 'http://static.rateyourmusic.com/lk/l/w/3b0ad3d58c2ad17379dd86cb5e8e1e2c/4468578.jpg', 'http://static.rateyourmusic.com/lk/l/w/04d995e5c32585d2a9ed1ec3f0af6053/4468580.jpg', 'http://static.rateyourmusic.com/lk/l/w/6fbcb3ecad905e009721451f8e85b6a5/4468579.jpg', 'http://static.rateyourmusic.com/lk/l/w/1a090b81065956819107541a865ff774/4468581.jpg'];

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
    ignoreButton.innerHTML = ' ignore user';
    ignoreButton.className = 'smallgray';
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
        ignoreButton.innerHTML = ' unignore user';
        ignoreButton.className = 'smallgray';
        others = username[0].parentNode.parentNode.getElementsByTagName('*');
        for (x=4; x<(others.length-1); x++){
            others[x].style.display = 'none';
        }
        if (posts[i] == undefined){alert('undefined');}
        postContent = posts[i].parentNode.getElementsByTagName('blockquote')[0];
        if (postContent != undefined){
            postContent.style.display = 'none';
            
            x = document.createElement('img');
            ki = Math.floor(Math.random()*kittenImages.length);
            x.src = kittenImages[ki];
            x.className = username[0].innerHTML+'Ignore';
            x.height = 200;
            postContent.parentNode.appendChild(x);
        }
    }
}