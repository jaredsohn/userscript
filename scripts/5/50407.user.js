// ==UserScript==
// @name          Version 2 kill filter
// @version       1.0
// @description   Kill filter for version 2. 
// @copyright     2009, Jakob Hilmer
// @author        Jakob Hilmer (jakob@hilmer.dk)
// @license       GPL v3
// @include       http://www.version2.dk/*
// ==/UserScript==
          
var forumPosts = [];

function removeFromKillFilter(e) {
	var id = e.target.getAttribute('id');
	var obj = document.getElementsByClassName('forum-post')[id];
	var author = obj.getElementsByClassName('author')[0];
	var href = author.getElementsByTagName("a")[0];
	var userid = href.getAttribute("href");
	killed = killed.replace(userid+";","");
	GM_setValue('killed', killed);
	obj.style['display'] = 'normal';
	window.location.reload();
}

function addToKillFilter(e) {
	var id = e.target.getAttribute('id');
	var obj = document.getElementsByClassName('forum-post')[id];
	var author = obj.getElementsByClassName('author')[0];
	var href = author.getElementsByTagName("a")[0];
	var userid = href.getAttribute("href");
	killed+=userid+';';
	GM_setValue('killed', killed);
	obj.style['display'] = 'none';
	window.location.reload();
}

function showKilled() {
	forumPosts = document.getElementsByClassName('forum-post');
	for (var i = 0; i < forumPosts.length; i++) {
		var forumPost = forumPosts[i];
		var author = forumPost.getElementsByClassName('author')[0];
		var href = author.getElementsByTagName("a")[0];
		var userid = href.getAttribute("href");
		var isKilled = killed.indexOf(userid+';');
		if (isKilled>=0) {
			forumPost.style['display'] = '';
		}
	}
	return true;
}

function addHandlesToForumPosts() {
	var killCount = 0;

	var commentSpan = document.getElementsByClassName('debatbox')[0].getElementsByTagName('span')[0];

	forumPosts = document.getElementsByClassName('forum-post');
	for (var i = 0; i < forumPosts.length; i++) {
		var forumPost = forumPosts[i];
		var author = forumPost.getElementsByClassName('author')[0];
		var href = author.getElementsByTagName("a")[0];
		var userid = href.getAttribute("href");
		var isKilled = killed.indexOf(userid+';');
		newLink = document.createElement('a');
		newLink.setAttribute('id',i);
		if (isKilled>=0) {
			v = document.createTextNode('[Unkill]');
			newLink.addEventListener('click', removeFromKillFilter, false);
			forumPost.style['display'] = 'none';
			killCount++;
		} else {
			v = document.createTextNode('[Kill]');
			newLink.addEventListener('click', addToKillFilter, false);
		}
		newLink.appendChild(v);
		author.appendChild(newLink);
	}
	newLink = document.createElement('a');
	v = document.createTextNode(' ' + killCount + ' Killed');
	newLink.addEventListener('click', showKilled, false);
	newLink.appendChild(v);
	commentSpan.appendChild(newLink);
	
	return true;
}

killed = GM_getValue("killed", "");

addHandlesToForumPosts();