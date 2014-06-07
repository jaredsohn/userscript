// ==UserScript==
// @name           reddit_see_all_comments
// @namespace      reddit
// @description    Adds a link to any user page on Reddit taking you to the full comments of a submission.
// @include        http://reddit.com/user/*
// @include        http://www.reddit.com/user/*
// ==/UserScript==

var lists = document.getElementsByTagName('ul');
for (var i = 0; i < lists.length; ++i) {
	var l = lists[i];
	if (l.className=="flat-list buttons") {
		var firstNode = l.childNodes[0];
		var sp1 = document.createElement("li");
		var url = firstNode.childNodes[0].href;

		var newLink = document.createElement('A');
			newLink.appendChild(document.createTextNode('all comments'));
			newLink.setAttribute('href', url.substring(0,url.lastIndexOf('/')));

			sp1.appendChild(newLink);
			l.insertBefore(sp1, l.childNodes[1]);
	}
}