// ==UserScript==
// @name          Tumblr - Missing E Warning Remover
// @namespace     http://userstyles.org
// @description	  This script hides the Missing E warning whenever it tries to appear.
// @author        invertere
// @homepage      http://userstyles.org/styles/58773
// @include       http://www.tumblr.com/dashboard*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#overlay, #detection_alert {\ndisplay:none;}\n\nbody {\noverflow: auto!IMPORTANT;}";
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