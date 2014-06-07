// ==UserScript==
// @name           4chanspamkilleredit
// ==UserScript==
// @name          4chan Spam Buster  Edited
// @namespace     http://www.userscripts.org
// @description   Gets rid of the JS spam on 4chan.
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("blockquote");
	for (i = 0; i < posts.length; i++)
	{
		if (posts[i].innerHTML.indexOf("tinyurl.com") != -1 || posts[i].innerHTML.indexOf("icanhaz.com") != -1 || posts[i].innerHTML.indexOf("bloat.me") != -1 || posts[i].innerHTML.indexOf("twurl.cc") != -1 || posts[i].innerHTML.indexOf("twurl.nl") != -1 || posts[i].innerHTML.indexOf("fon.gs") != -1 || posts[i].innerHTML.indexOf("tr.im") != -1 || posts[i].innerHTML.indexOf("2big.at") != -1 || posts[i].innerHTML.indexOf("piurl.com") != -1 || posts[i].innerHTML.indexOf("UR GOD") != -1 || posts[i].innerHTML.indexOf("UR GODS") != -1 || posts[i].innerHTML.indexOf("linkbee.com") != -1)
		{
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i = i - 1;
		}
	}
})()