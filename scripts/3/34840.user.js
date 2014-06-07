// ==UserScript==
// @name           Open TinyURL (in twitter) by using SSL URL
// @namespace      twitter.com
// @description    This script rewrites all links to use the SSL tinyurl.com domain. THIS IS FOR Twitter only
// @include       https://*.twitter.com/*
// @include       http://*.twitter.com/*
// @include        http://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");

for ( var i = 0; i < links.length; ++i ) {
	// Update the link to SSL
	// Use switch to catch some exceptions
	if (links[i].href.charAt(4) != "s" && links[i].href.indexOf("tinyurl.com") != -1 ) {
		var url = links[i].href.split("tinyurl.com");
		links[i].href = "https://tinyurl.com" + url[1];
	}
}
