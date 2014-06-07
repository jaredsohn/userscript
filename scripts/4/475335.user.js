// ==UserScript==
// @name        4chan Link Fixer
// @namespace   gippodudee
// @include     *://boards.4chan.org/*
// @version     1
// @grant       none
// ==/UserScript==

var threadurl = /thread\/[0-9]+/;
var links = document.getElementsByClassName("replylink");
for (var j=0;j<links.length;j++) {
	var href = links[j].getAttribute("href");
	var newurl = threadurl.exec(href);
	links[j].setAttribute("href",newurl);
}