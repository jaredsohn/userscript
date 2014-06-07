// ==UserScript==
// @name          4chan Spam Buster
// @namespace     http://www.userscripts.org
// @description   Gets rid of the JS spam on 4chan.
// @include       http://*4chan.org/b/*
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("embed");
	for (i = 0; i < posts.length; i++)
	{
posts[i].parentNode.removeChild(posts[i]);
		i = i - 1;
	}
})()