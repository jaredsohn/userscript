// ==UserScript==
// @name           Minimalist imo.im
// @namespace      http://bob23646.deviantart.com/
// @description    minimalistic version of imo.im
// @include        *imo.im*
// ==/UserScript==

(function() {
var css = ".nav_box,.accountActions,.moreAccounts,.helpIMO,#yui-gen70,#yui-gen72,#yui-gen126,#yui-gen155 { display:none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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
