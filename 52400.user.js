// ==UserScript==
// @name           iGoolge compact header
// @namespace      http://userscripts.org/users/americanjesus
// @description    Compact header and remove footer
// @author         American_Jesus
// @version        2009.11.27
// @include        http://www.google.tld/ig*
// @include        http://www.google.com/webhp*
// ==/UserScript==

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #nhdrwrapinner { height: 60px; } #addstuff { position: absolute; top: 20px; right: 0%; } #promo { position: absolute; top: 45px; left: 0%; } #undel_box { position: absolute; top: 25px; left: 40%; } #search_restriction_radio_buttons, .gradient, #footerwrap { display: none !important; }";

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