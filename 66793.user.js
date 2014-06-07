// ==UserScript==
// @name          Reddit Highlight OP Like IAmA
// @namespace     
// @description	  I really liked the highlights in the IAmA section of reddit and wrote this scripts to highlight the OP in the same on other parts of the site. I just copied the CSS code from the source files on an IAmA page and added a few tweaks to make it work.
// @author        DrAsstdHomicide
// @homepage      
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==
(function() {
var css = ".author.submitter {color: white !important; padding: 0 2px 0 2px; -moz-border-radius: 3px; -webkit-border-radius: 3px} .noncollapsed .author.submitter {background-color: #5F99CF} .collapsed .author.submitter {color: white !important; background-color: #AAA} .author.submitter:hover {background-color: #4E7EAB; text-decoration: none !important}";
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
