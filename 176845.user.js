// ==UserScript==
// @name                Bubblews - User and Post Money
// @version        		1.02
// @description	        Shows stats about any user.
// @include				http://www.bubblews.com/*
// @include				http://bubblews.com/*
// @downloadURL			http://userscripts.org/scripts/source/176845.user.js
// @updateURL			http://userscripts.org/scripts/source/176845.user.js
// ==/UserScript==


if (location.pathname.indexOf("submit") != -1 || location.pathname.indexOf("edit") != -1)
{
    note = document.getElementsByClassName('note')[0].remove();
    
    var post = document.getElementsByTagName('TEXTAREA')[0].textLength;
	setInterval(function(){
        post = document.getElementsByTagName('TEXTAREA')[0].textLength;
        char.innerHTML = 'Characters: ' + post;
    },10);
    
	var char = document.createElement('text');
    char.innerHTML = 'Characters: ' + post;
    char.id = 'Characters';
    char.style.fontFamily = "tahoma";
    char.style.fontSize = "12";
    char.style.position = "relative"
    char.style.bottom ="0px"
    char.style.right = "0px"
    
    var title = document.getElementById('title');
    if (title.value.indexOf("&#039;") != -1 || title.value.indexOf("&quot;") != -1 || title.value.indexOf("&amp;") != -1)
    {
        title = document.getElementById('title');
        title.value = title.value.replace(/&#039;/g,"\'");
        title.value = title.value.replace(/&quot;/g,"\"");
        title.value = title.value.replace(/&amp;/g,"\&");
    }
    
    var content = document.getElementById('main_content');
    content.appendChild(char);
}

if (location.pathname.indexOf("account") != -1 && location.pathname.indexOf("posts") == -1)
{
    var likes = document.getElementById('user_likes').innerHTML;
    likes = likes.replace(/\D/g,'');
    likes = parseFloat(likes)

	var dislikes = document.getElementById('user_dislikes').innerHTML;
    dislikes = dislikes.replace(/\D/g,'');
    dislikes = parseFloat(dislikes)
    
    var statsN = document.getElementById('profile_stats').innerHTML;
    var postsN = statsN.search("Articles Posted");
    var commentsN = statsN.search("Comments");
    var viewsN = statsN.search("Views");

    var posts = statsN.slice(postsN, commentsN);
    posts = posts.replace(/\D/g,'');
    posts = parseFloat(posts)
    
    var comments = statsN.slice(commentsN, viewsN);
    comments = comments.replace(/\D/g,'');
    comments = parseFloat(comments)

    var views = statsN.slice(viewsN, statsN.length);
    views = views.replace(/\D/g,'');
    views = parseFloat(views)

    earned = document.createElement('text');
    earned.id = 'more_stats'; earned.style.fontFamily = "tahoma"; earned.style.color = "#336680";
    earned.innerHTML = '&nbsp;Total Earned: $ ' + (Math.round(likes +dislikes + posts + comments + views)/100).toString();
    earned.style.position = "relative"; earned.style.top ="8px"; earned.style.right ="600px";

    var user = document.getElementById('search_nav');
    user.appendChild(earned);
}


if (location.pathname.indexOf("news") != -1 && (location.pathname.indexOf("submit") == -1 || location.pathname.indexOf("edit") == -1))
{
	var views = document.getElementById('total_views').innerHTML;
    views = views.replace(/\D/g,'');
    views = parseFloat(views)
    
	var comments = document.getElementById('total_comments').innerHTML;
    comments = comments.replace(/\D/g,'');
    comments = parseFloat(comments)
    
    var likes = document.getElementsByClassName('likes')[0].innerHTML;
    likes = likes.replace(/\D/g,'');
    likes = parseFloat(likes)
    
    var dislikes = document.getElementsByClassName('dislikes')[0].innerHTML;
    dislikes = dislikes.replace(/\D/g,'');
    dislikes = parseFloat(dislikes)
    
    earned = document.createElement('text');
    earned.id = 'more_stats'; earned.style.fontFamily = "tahoma"; earned.style.color = "#336680";
    earned.innerHTML = '&nbsp;Post Worth: $ ' + (Math.round(views + comments + likes + dislikes)/100).toString();
    earned.style.position = "relative"; earned.style.top ="8px"; earned.style.right ="600px";

    var user = document.getElementById('search_nav');
    user.appendChild(earned);
}