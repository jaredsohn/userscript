// ==UserScript==
// @name           Hide Google Instant Preview button
// @version        3.1
// @author         ArpitNext
// @namespace      http://blog.arpitnext.com/
// @description    Hide Google Instant Preview button
// @include        http://*.google.*
// @include        https://*.google.*
// ==/UserScript==

(function() {
//var css = ".vspib, .vspi {display: none;} #vsi, #vsic, #vsrs, #botstuff, #vspb {display: none;}";
var css = ".vspib {display: none;} .vshid {display: inline; margin-left:7px;}";
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
