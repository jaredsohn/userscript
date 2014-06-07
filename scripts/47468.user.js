// ==UserScript==
// @name          Erqqvg Compact - Minimal Space
// @namespace     http://userstyles.org
// @description	  Minimal space for your own increased time-wasting pleasure
// @author        galskapen
// @homepage      http://userstyles.org/styles/17286
// @include       http://erqqvg.com/*
// @include       https://erqqvg.com/*
// @include       http://*.erqqvg.com/*
// @include       https://*.erqqvg.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); body {margin:0 !important;} #navbar {margin:-1px 0 0 -1px!important; padding:0 !important;} #navbar a {padding:0 5px !important;} #slownotice, #header {display:none !important;} #viewlinks {float:right !important;width:300px !important;margin-top:-18px !important;padding:0 !important;} #viewlinks a {padding:0 5px !important;} #live {margin-top: 5px !important;}";
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
})();
