// ==UserScript==
// @name          Reddit Subreddit Search
// @namespace url(http://www.w3.org/1999/xhtml);
// @description	  Makes the reddit search the current subreddit by default.  Modified version of http://userscripts.org/scripts/review/39848.
// @author        byee01
// @websiite      http://www.github.com/byee01
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// @version       0.5
// ==/UserScript==

(function() {
	var sr = document.createElement("input");
	sr.setAttribute("type", "hidden");
	sr.setAttribute("name", "restrict_sr");
	sr.setAttribute("value", "on");
	document.getElementById("search").appendChild(sr);
})();