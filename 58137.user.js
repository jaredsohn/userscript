// ==UserScript==
// @name          Tweetie Retweet URL Replacer
// @namespace     http://www.webmaster-source.com/
// @description   Makes "tweet this" links from Tweetmeme.com widgets open in Tweetie for Mac
// @version	1.1
// @include       http://api.tweetmeme.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (i = 0; i < links.length; i++) {
	if (links[i].class = "retweet") {
		links[i].href = replaceTwitterURL(links[i].href);
		links[i].target = "_self";
	}
}


function replaceTwitterURL(url) {
	//http://twitter.com/home/?status=
	//javascript:window.location='tweetie:'+document.title
	var replaced = url.replace('http://twitter.com/home/?status=', 'tweetie:');
	replaced = decodeURIComponent(replaced.replace(/\+/g,  " "));
	return replaced;
}