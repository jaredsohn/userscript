// ==UserScript==
// @name          4chan Spam Buster
// @namespace     http://www.userscripts.org
// @description   Gets rid of the nigger spam on 4chan.
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("blockquote");
	var spam = "nigger";
	for (i = 0; i < posts.length; i++)
	{
		if (posts[i].innerHTML.indexOf(spam) == 0)
		{
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i = i - 1;
		}
	}
})()
