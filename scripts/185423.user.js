// ==UserScript==
// @name          Stylish test style
// @namespace     http://userstyles.org
// @description	  If you install this and all text turns red, Stylish is working.
// @author        JasonBarnabe
// @homepage      http://userstyles.org/styles/1
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "*{ color: red !important; }";
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
