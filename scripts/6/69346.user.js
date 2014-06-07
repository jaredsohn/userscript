// ==UserScript==
// @name          google ++ allernative addon
// @namespace     http://userstyles.org
// @description	  I think Google++ by blizzchris is an excellent script,but I don't really want the right hand column,so this changes it to full width no right column
// @author        rover3500
// @homepage      http://userstyles.org/styles/25372
// @include    http://www.google.tld/search?*
// @include    http://www.google.tld/webhp?*
// @include    http://www.google.tld/#*
// @include    http://www.google.tld/ig?*
// ==/UserScript==
(function() {
var css = "*[style*=\"302\"]{display:none !important;}\n#gsr {-moz-column-count:auto !important;}\n.med{width:125% !important;}";
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
