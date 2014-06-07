// ==UserScript==
// @name          JA
// @namespace     http://userstyles.org
// @description	  Just Answer fixing
// @author        3guk
// @homepage      http://userstyles.org/styles/43306
// @include       http://www.justanswer.com*
// ==/UserScript==

(function() {
var css = ".text-qlist-data a:visited{ color:#CC6600 !important;} .text-qlist-question a:visited {color:#CC6600 !important;}";
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
