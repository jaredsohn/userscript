// ==UserScript==
// @name          4chan "OP" reply SPAM Blocker
// @namespace     http://www.userscripts.org
// @description   Gets rid of the OP reply spam on 4chan. This is a dirty modification of 4chan Spam Buster.
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {

	var posts = document.getElementsByTagName("blockquote");

	for (i = 0; i < posts.length; i++)

	{

		if (posts[i].innerHTML.indexOf("I respect your position, but seriously, check out this CP") != -1 || ( ( posts[i].innerHTML.indexOf("I") != -1 ) && ( posts[i].innerHTML.indexOf("pr0n to you, my") != -1 ) && ( posts[i].innerHTML.indexOf("/b/tard") != -1 ) ) || posts[i].innerHTML.indexOf("http://www.youtube.com/watch?v=KcK2hRtIQ3E") != -1 || posts[i].innerHTML.indexOf("(no underage b&, I promise) *wink wink*") != -1 || posts[i].innerHTML.indexOf("pr0n to you,") != -1)

		{

			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);

			i = i - 1;

		}

	}

})()