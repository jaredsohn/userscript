// ==UserScript==
// @name          test
// @namespace     http://www.userscripts.org
// @description   Gets rid of the spam on 4chan. This is a dirty modification of 4chan Spam Buster.
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {

	var posts = document.getElementsByTagName("blockquote");

	for (i = 0; i < posts.length; i++)

	{

		if (posts[i].innerHTML.indexOf("I respect your position, but seriously, check out this CP") != -1 || posts[i].innerHTML.indexOf("RAIDCHAN") != -1 || posts[i].innerHTML.indexOf("Kayla") != -1 || posts[i].innerHTML.indexOf("Luk0r") != -1 || posts[i].innerHTML.indexOf("Z0Mg") != -1) != -1 || posts[i].innerHTML.indexOf("That's interesting, you should check out this CP though.") != -1) || posts[i].innerHTML.indexOf("This should answer your question") != -1)

		{

			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);

			i = i - 1;

		}

	}

})()