// ==UserScript==
// @name          Remove Activity
// @namespace     http://userstyles.org
// @description	  Removes activity.
// @author        johnpowell
// @include       http://www.fluther.com/*
// @include       https://www.fluther.com/*
// @include       http://*.www.fluther.com/*
// @include       https://*.www.fluther.com/*
// ==/UserScript==
(function() {
var css = "html body div#container div#content-container div#sidebar div#dashboard.module-plain div.content div#activity p:nth-child(odd) {display: none !important;}";
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