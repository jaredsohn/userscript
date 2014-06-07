// ==UserScript==
// @name          fullscreen carbon2
// @namespace     http://userstyles.org
// @description	  dongsu
// @author        roktetwrfzvgra
// @homepage      http://userstyles.org/styles/64233
// @include       http://planetfreedom.freeforums.org/*
// @include       https://planetfreedom.freeforums.org/*
// @include       http://*.planetfreedom.freeforums.org/*
// @include       https://*.planetfreedom.freeforums.org/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "html body#phpbb.section-index div#wrap{width: 100%!important;}";
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