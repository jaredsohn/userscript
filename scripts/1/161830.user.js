// ==UserScript==
// @name          No More Red Modmail - creesch
// @namespace     http://userstyles.org
// @description	  Gets rid of annoying red modmail messages resulting from a subreddit moderator clicking "remove" on a message.
// @author        ytknows, something else by creesch
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".messages-page .message-parent, .messages-page .thing.spam {\n    background-color:transparent!important;\n}   .thing.spam .entry .noncollapsed .tagline .head {\n    color: red !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();