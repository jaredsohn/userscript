// ==UserScript==
// @name           Reddit Tabbed Links
// @namespace      scottmweaver
// @description    Opens reddit links in a new tab.
// @include        http://www.reddit.com/*
// @exclude        http://www.reddit.com/*/comments/*
// ==/UserScript==

var classes = ['title', 'comments', 'author', 'subreddit', 'bylink'];

for(var i=0;i<classes.length;i++)
	for(var x=0;x<document.getElementsByClassName(classes[i]).length;x++)
		(document.getElementsByClassName(classes[i]))[x].setAttribute("target", "_blank");