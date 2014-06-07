// ==UserScript==
// @name        Unblock if page contains
// @match       *://*.youtube.com/*
// @run-at      document-start
// ==/UserScript==

var exception = "zisteau"
var oldUrlPath  = window.location.pathname;

if (window.find) {
	var found = window.find (exception);
    if (found) {
		var newURL  = window.location.protocol + "//"
                + window.location.hostname
                + oldUrlPath + "&adblock"
                ;

    window.location.replace (newURL);
	}
	else {}
else {}