// ==UserScript==
// @name          Codecademy Hide Top Black Bar on Course Pages
// @icon        http://imgur.com/oQ3bZOO.png
// @namespace     http://userstyles.org
// @description	  controls from top bar will appear on mouse hover, other pages on codecademy will display top bar as usual
// @author        BskyB
// @homepage      http://userstyles.org/styles/89508
// @version		2013.06.23
// @require    http://usocheckup.dune.net/171741.js
// @downloadURL		https://userscripts.org/scripts/source/171741.user.js
// @updateURL		https://userscripts.org/scripts/source/171741.meta.js
// @include       http://codecademy.com/*
// @include       https://codecademy.com/*
// @include       http://*.codecademy.com/*
// @include       https://*.codecademy.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "header.main {\n margin-top:-40px !important;\n-moz-transform: translateZ(0) !important;\n-moz-transition:padding-top 0.2s !important;\n-webkit-transform: translateZ(0) !important;\n-webkit-transition:padding-top 0.2s !important;\n}\nheader.main:hover {\npadding-top: 40px !important;\n z-index: 99999;\n}\n.lesson-left-bar, .lesson-middle {\ntop:5px !important;\n}\n.ui-header__logo {\nbackground-color: black !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
