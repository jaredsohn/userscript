// ==UserScript==
 // @name          Google AD Killer
 // @namespace     http://userstyles.org
 // @description	  Hides advertisement.
 // @author        Thomas Jedenfelt
 // @homepage      http://userstyles.org/styles/42319
 // @include       http://google.com/*
 // @include       https://google.com/*
 // @include       http://*.google.com/*
 // @include       https://*.google.com/*
 // @run-at        document-start
// @updateURL      https://userscripts.org/scripts/source/149396.meta.js
 // @downloadURL    https://userscripts.org/scripts/source/149396.user.js
 // ==/UserScript==
 (function() {
 var css = "div#tads, div#bottomads {\n  display: none !important;\n  }";
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
 