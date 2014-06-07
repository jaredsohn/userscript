// ==UserScript==
// @name	GoogleChrome Ogame footer fix
// @include	http://*ogame*/game/index.php?page=*&session=*
// @exclude http://*.ogame.*/game/index.php?page=empire*
// ==/UserScript==

(function() {
var css = "#siteFooter {background: none; z-index: -2;} #siteFooter .fright{width: 320px; } .textRight{margin-top: 20px;} .textLeft{margin: 20px;}";
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