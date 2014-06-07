// ==UserScript==
// @name	GoogleChrome Ogame footer fix
// @include	http://*ogame*/game/index.php?page=*&session=*
// ==/UserScript==

(function() {
var css = "#siteFooter{background: none!important;z-index: -5!important;}";
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