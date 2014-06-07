// ==UserScript==
// @name           Hide Google Instant Preview button and retain "Cached"/"Similar" links to their original positions
// @version        3.2
// @author         ArpitNext(Modified by Vivek)
// @namespace      http://blog.arpitnext.com/
// @description    This is a modified script to the original from ArpitNext(http://userscripts.org/scripts/review/90222) to both hide the annoying Google Instant preview and get back the very useful Cached/Similar links in their original positions.
// @include        http://*.google.*
// @include        https://*.google.*
// ==/UserScript==

(function() {
var css = ".vspib {display: none;} .vshid {display: inline; margin-left:7px;} #nyc{display:none;}";
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

var dialog = document.getElementById("nyc");
dialog.parentNode.removeChild(dialog);
})();
