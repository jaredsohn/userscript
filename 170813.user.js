// ==UserScript==
// @name         Google+ Mark/Unmark message
// @version      0.1a
// @description  Mark selected message (under mouse cursor).
// @match        https://plus.google.com/*
// ==/UserScript==

var mark_last_post = function() {
	var posts, post;

	posts = document.getElementsByClassName('Tg Sb ChZ7Rc sb');
	if (posts.length === 0)
		return;
	else
		post = posts[0];

	// Don't affect the share window. 
	if (post.dataset.iid !== undefined)
		return;
 
	post.style.borderLeft = '3px solid #FF0000';
	post.style.borderRadius = '5px';

};

var unmark_last_post = function() {
	var posts, post;

	posts = document.getElementsByClassName('Tg Sb ChZ7Rc sb');
	if (posts.length === 0)
		return;
	else
		post = posts[0];

	// Don't affect the share window. 
	if (post.dataset.iid !== undefined)
		return;
 
	post.style.borderLeft = '0px solid #FFFFFF';
	post.style.borderRadius = '0px';

};


window.addEventListener('keydown', function(e) {
	if (e.keyCode === 77) {
		mark_last_post();
	}
});

window.addEventListener('keydown', function(e) {
	if (e.keyCode === 85) {
		unmark_last_post();
	}
	
});