// ==UserScript==
// @name          Tumblr Dashboard long tags visible
// @namespace     http://userstyles.org
// @description	  When people have too many words in their tags to fit on one line, it gets cut off. This should make it so that the tags wrap around.
// @author        buddyjcat
// @homepage      http://userstyles.org/styles/33653
// @include       http://www.tumblr.com/dashboard
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".tags a {overflow: visible !important; display: block !important; white-space: normal !important;margin-top:5px !important;}";
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