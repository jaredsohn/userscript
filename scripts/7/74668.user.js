// ==UserScript==
// @name          Cooltop Remover
// @namespace     http://www.userscripts.org
// @description   Gets rid of Cooltop spam.
// @include       http://*4chan.org/*
// ==/UserScript==

(function() {
	var posts = document.getElementsByTagName("span");
	for (i = 0; i < posts.length; i++)
	{
		if (posts[i].innerHTML.indexOf("Cooltop") != -1 || posts[i].innerHTML.indexOf("kooltop") != -1)
		{
		if (posts[i].className == "commentpostername") {
			posts[i].parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(posts[i].parentNode.parentNode.parentNode.parentNode);
			i = i - 1;
		}
		}
	}
})()