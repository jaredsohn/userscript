// ==UserScript==
// @name           Twitter Prefetch Links
// @namespace      -
// @include        http://twitter.com/*
// ==/UserScript==

var excludes = [
	"?status=",
	"http://twitter.com/",
	"http://blog.twitter.com/",
	"http://status.twitter.com/",
	"http://dev.twitter.com/",
	"http://business.twitter.com/",
	"http://support.twitter.com/",
	"http://m.twitter.com/"
];
var excludesLen = excludes.length;
var links = document.getElementsByTagName("a");
var linksLen = links.length;
var prefetched = [];

function inArray(needle, haystack) {
	var haystackLen = haystack.length;
	for(var i = 0; i < haystackLen; i++) {
		if(haystack[i] == needle) {
			return true;
		}
	}
	return false;
}

function prefetch() {
	var prefetches = "";

	for(var i = 0; i < linksLen; i++) {
		if((! links[i].href.length) || inArray(links[i], prefetched)) {
			continue;
		}
		
		var skip = false;
		for(var j = 0; j < excludesLen; j++) {
			if(links[i].href.indexOf(excludes[j]) != -1) {
				skip = true;
			}
		}
		if(! skip) {
			prefetches += "<link rel='prefetch' href='" + links[i] + "'>\n";
			prefetched[prefetched.length] = links[i].href;
		}
	}
	if(prefetches.length) {
		var fetches = document.createElement("div");
		fetches.innerHTML = prefetches;
		document.getElementsByTagName("head")[0].appendChild(fetches);
	}
}

prefetch();
setInterval(prefetch, 5000);
