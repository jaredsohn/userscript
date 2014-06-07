// ==UserScript==
// @name       Google Plus Helper
// @namespace  http://ysmood.org
// @version    0.4
// @description  To make browsing google plus more easily.
// @match      https://plus.google.com/*
// @copyright  2013+, ys
// ==/UserScript==

var mark_last_post = function() {
	var posts, post;

	posts = document.getElementsByClassName('MZxWCd');
	if (posts.length === 0)
		return;
	else
		post = posts[0];

	// Don't affect the share window. 
	if (post.dataset.iid !== undefined)
		return;

	post.style.borderLeft = '3px solid #5A88CC';
	post.style.borderRadius = '5px';
};

window.addEventListener('keydown', function(e) {
	if (e.keyCode === 74 ||
		e.keyCode === 75) {
		mark_last_post();
	}
});
