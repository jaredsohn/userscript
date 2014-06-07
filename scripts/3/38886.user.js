// ==UserScript==
// @name          4chan Spam Buster
// @namespace     http://www.userscripts.org
// @description   Gets rid of the JS spam on 4chan.
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		if (posts[i].innerHTML.indexOf("OwN3D bY #tr0ll") != -1)
		{
			try {
				posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
				i = i - 1;
			} catch(e) {}
		}
	}
})()