// ==UserScript==
// @name                Bubblews - Notifications Filter
// @version        		1.2
// @description	        Very basic filters to the notifications page.
// @include				http://bubblews.com/notifications*
// @include				http://www.bubblews.com/notifications*
// @downloadURL			http://userscripts.org/scripts/source/176729.user.js
// @updateURL			http://userscripts.org/scripts/source/176729.user.js
// ==/UserScript==

var note = document.getElementById('notifications_view');

var showPosts = document.createElement('input');
showPosts.type = 'button';
showPosts.value = 'Posts';

var showComments = document.createElement('input');
showComments.type = 'button';
showComments.value = 'Comments';

var showConnect = document.createElement('input');
showConnect.type = 'button';
showConnect.value = 'Connections';

var showLikes = document.createElement('input');
showLikes.type = 'button';
showLikes.value = 'Likes';

var showMentions = document.createElement('input');
showMentions.type = 'button';
showMentions.value = 'Mentions';

var showTag = document.createElement('input');
showTag.type = 'button';
showTag.value = 'Tags';

var showDislike = document.createElement('input');
showDislike.type = 'button';
showDislike.value = 'Dislikes';

var showDefault = document.createElement('input');
showDefault.type = 'button';
showDefault.value = 'Default';

note.parentNode.insertBefore(showPosts, note);
note.parentNode.insertBefore(showComments, note);
note.parentNode.insertBefore(showConnect, note);
note.parentNode.insertBefore(showLikes, note);
note.parentNode.insertBefore(showMentions, note);
note.parentNode.insertBefore(showTag, note);
note.parentNode.insertBefore(showDislike, note);
note.parentNode.insertBefore(showDefault, note);

var time = document.getElementsByTagName('H2');
var posts = document.getElementsByClassName('notification-posted');
var comments = document.getElementsByClassName('notification-comment');
var connect = document.getElementsByClassName('notification-connect');
var likes = document.getElementsByClassName('notification-like');
var profile = document.getElementsByClassName('notification-comment_profile');
var sibling = document.getElementsByClassName('notification-sibling_comment');
var mention = document.getElementsByClassName('notification-user_tag');
var tag = document.getElementsByClassName('notification-pulse_tag');
var dislike = document.getElementsByClassName('notification-dislike');


function formatString(title)
{
    title = title.slice(title.search("/news/")+6, title.length);
    title = title.slice(0, title.search("\""));
    
    title = title.replace(/039/g, '\'');
	title = title.replace(/-/g, ' ');
	title = title.replace(/\d/g, ' ');
    
    return title.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

showPosts.onclick = function() {
    var title = new Array();
    
    for(var a=0;a<posts.length;a++) {
        title[a] = posts[a].innerHTML;
        title[a] = formatString(title[a]);

        posts[a].innerHTML = posts[a].innerHTML.replace("submitted a new", "submit");
        posts[a].innerHTML = posts[a].innerHTML.replace(">post<", ">"+title[a]+"<");
        
        posts[a].style.display = 'block';
    }
    hide(false, true, true, true, true, true, true);
}

showComments.onclick = function() {
    var title = new Array();
    for(var a=0;a<comments.length;a++) {
        title[a] = comments[a].innerHTML;
        title[a] = formatString(title[a]);

        comments[a].innerHTML = comments[a].innerHTML.replace(">post<", ">"+title[a]+"<");
        
        comments[a].style.display = 'block';
    }
    for(var a=0;a<profile.length;a++) {
        profile[a].style.display = 'block';
    }
    for(var a=0;a<sibling.length;a++) {
        sibling[a].style.display = 'block';
    }
	hide(true, false, true, true, true, true, true, true);
}

showConnect.onclick = function() {
    for(var a=0;a<connect.length;a++) {
		connect[a].style.display = 'block';
	}
    hide(true, true, false, true, true, true, true);
}

showLikes.onclick = function() {
    var title = new Array();
    for(var a=0;a<likes.length;a++) {
        title[a] = likes[a].innerHTML;
        title[a] = formatString(title[a]);
        
        likes[a].innerHTML = likes[a].innerHTML.replace("likes your", "liked");
        likes[a].innerHTML = likes[a].innerHTML.replace(">post<", ">"+title[a]+"<");
        
		likes[a].style.display = 'block';
    }
    hide(true, true, true, false, true, true, true);
}

showMentions.onclick = function() {
    for(var a=0;a<mention.length;a++) {
        mention[a].style.display = 'block';
    }
    hide(true, true, true, true, false, true, true);
}

showTag.onclick = function() {
    for(var a=0;a<tag.length;a++) {
        tag[a].style.display = 'block';
    }
    hide(true, true, true, true, true, false, true);
}

showDislike.onclick = function() {
    for(var a=0;a<dislike.length;a++) {
        dislike[a].style.display = 'block';
    }
    hide(true, true, true, true, true, true, false);
}

function hide(postsHide, commentsHide, connectionsHide, likesHide, mentionsHide, tagsHide, dislikesHide) {
    if (postsHide == true) { var i = 0;
        while(posts[i]) {
            posts[i].style.display = 'none'; i++; }
	}
    if (commentsHide == true) { var i = j = k = 0;
        while(comments[i]) {
            comments[i].style.display = 'none'; i++;
        }
		while(sibling[j]) {
            sibling[j].style.display = 'none'; j++;
        }
		while(profile[k]) {
            profile[k].style.display = 'none'; k++;
        }
	}
    if (connectionsHide == true) { var i = 0;
        while(connect[i]) {
            connect[i].style.display = 'none'; i++; }
	}
    if (likesHide == true) { var i = 0;
        while(likes[i]) {
            likes[i].style.display = 'none'; i++; }
	}
    if (mentionsHide == true) { var i = 0;
        while(mention[i]) {
            mention[i].style.display = 'none'; i++; }
	}
    if (tagsHide == true) { var i = 0;
        while(tag[i]) {
            tag[i].style.display = 'none'; i++; }
	}
    if (dislikesHide == true) { var i = 0;
        while(dislike[i]) {
            dislike[i].style.display = 'none'; i++; }
	}
    
    while(time[0]) 
        time[0].parentNode.removeChild(time[0]);
}

showDefault.onclick = function() {
    location.reload(); }
