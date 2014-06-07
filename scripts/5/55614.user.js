// ==UserScript==
// @name           Heise.de - All Posts
// @namespace      https://github.com/LenAnderson/
// @downloadURL    https://github.com/LenAnderson/Heise-All-Posts/raw/master/heise_all_posts.user.js
// @version        0.1
// @include        http://www.heise.de/*/foren/*/read*
// ==/UserScript==
 
/**
 * SETTINGS
 * 
 * boolean _HEISEFORUM_UPDATE_THREAD
 * 	when set to true, the script will check every _UPDATE_INTERVAL seconds for new posts in this thread and appends them
 * int _HEISEFORUM_UPDATE_INTERVAL
 * 	time in seconds between two checks for new posts
  */
var _HEISEFORUM_UPDATE_THREAD = true;
var _HEISEFORUM_UPDATE_INTERVAL = 30;
 
 
window.heiseForum = {
	posts : [],
	subjects : [],
	users : [],
	dates : [],
	request : null,
	nextPost : false,
	currPost : null,
	lastPost : false,
	interval : null,
	getNextPostI : function() {
			heiseForum.getNextPost(heiseForum.lastPost);
		},
	getNextPost : function(url) {
			heiseForum.request = new XMLHttpRequest();
			heiseForum.request.open('GET',url,true);
			heiseForum.request.onreadystatechange = heiseForum.readyStateChangeListener;
			heiseForum.request.send('');
		},
	getFirstPost : function() {
			var p = document.getElementsByTagName('p');
			for (var i=0;i<p.length;i++) {
				if (p[i].className.toLowerCase() == 'posting_text')
					heiseForum.currPost = p[i];
			}
		},
	readyStateChangeListener : function() {
			if (heiseForum.request.readyState == 4) {
				if (heiseForum.nextPost) {
					heiseForum.retrievePost(heiseForum.request.responseText);
					heiseForum.retrieveUser(heiseForum.request.responseText);
					heiseForum.retrieveDate(heiseForum.request.responseText);
					heiseForum.retrieveSubject(heiseForum.request.responseText);
					heiseForum.showPost(heiseForum.posts.length-1);
				}
				heiseForum.retrieveNextPost(heiseForum.request.responseText);
				if (heiseForum.nextPost != false)
					heiseForum.getNextPost(heiseForum.nextPost);
			}
		},
	retrieveNextPost : function(html) {
			if (html.replace(/(\r|\n)/g,'').search(/Beitrag[^<a-z]<a[^>]+href="([^"]+)"/m) == -1) {
				if (heiseForum.nextPost)
					heiseForum.lastPost = heiseForum.nextPost;
				heiseForum.nextPost = false;
				if (_HEISEFORUM_UPDATE_THREAD)
					window.setTimeout(heiseForum.getNextPostI, 1000*_HEISEFORUM_UPDATE_INTERVAL);
			} else {
				heiseForum.nextPost = html.replace(/(\r|\n)/g,'').replace(/^.+Beitrag[^<a-z]<a[^>]+href="([^"]+)".+$/, '$1');
			}
		},
	retrievePost : function(html) {
			heiseForum.posts[heiseForum.posts.length] = html.replace(/(\r|\n)/g,'').replace(/^.+<p class="posting_text">(.+?)<\/p>.+/, '$1');
		},
	retrieveUser : function(html) {
			heiseForum.users[heiseForum.users.length] = html.replace(/(\r|\n)/g,'').replace(/^.+<div class="user_info">(.+?)<\/div>.+/, '$1');
		},
	retrieveDate : function(html) {
			heiseForum.dates[heiseForum.dates.length] = html.replace(/(\r|\n)/g,'').replace(/^.+<div class="posting_date">(.+?)<\/div>.+/, '$1');
		},
	retrieveSubject : function(html) {
			heiseForum.subjects[heiseForum.subjects.length] = html.replace(/(\r|\n)/g,'').replace(/^.+<h3 class="posting_subject">(.+?)<\/h3>.+/, '$1');
		},
	showPosts : function() {
			for (var i=0;i<heiseForum.posts.length;i++) {
				heiseForum.showPost(i);
			}
		},
	showPost : function(i) {
			var date = document.createElement('div');
			date.innerHTML = heiseForum.dates[i];
			date.className = 'posting_date';
			var subject = document.createElement('h3');
			subject.innerHTML = heiseForum.subjects[i];
			subject.className = 'posting_subject';
			var user = document.createElement('div');
			user.innerHTML = heiseForum.users[i];
			user.className = 'user_info';
			var post = document.createElement('p');
			post.innerHTML = heiseForum.posts[i];
			post.className = 'posting_text';
			var container = document.createElement('div');
			container.appendChild(date);
			container.appendChild(subject);
			container.appendChild(user);
			container.appendChild(post);
			container.style.background = i%2? '' : '#EEEEEE';
			heiseForum.currPost.parentNode.insertBefore(container, heiseForum.currPost.nextSibling);
			heiseForum.currPost = container;
			if (!heiseForum.tabHasFocus) {
				var num = 1*document.title.replace(/^(\.\((\d+)\)\. )?.*$/, '$2');
				num++;
				document.title = document.title.replace(/^(\.\((\d+)\)\.)?/, '.('+num+'). ');
			}
		},
    tabHasFocus : false,
	init : function() {
			heiseForum.getFirstPost();
			heiseForum.retrieveNextPost(document.getElementsByTagName('body')[0].innerHTML);
			if (heiseForum.nextPost)
				heiseForum.getNextPost(heiseForum.nextPost);
			window.addEventListener('focus', function() { heiseForum.tabHasFocus = true; window.setTimeout(function() { if (heiseForum.tabHasFocus) document.title = document.title.replace(/^(\.\(\d+\)\. )?/, ''); }, 2000) }, false);
        	window.addEventListener('blur', function() { heiseForum.tabHasFocus = false; }, false)
		}
}
heiseForum.init();