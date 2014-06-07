// ==UserScript==
// @name           Fix the Social Stream
// @namespace      http://zooomr.com
// @description    This will fix your Social Stream so its readable again
// @include        http://*.zooomr.com/socialstream/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); .SocialStream {background:#fff;} #content div {background:#fff;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
