// ==UserScript==
// @name	Visible Smileys BoardOgame For Chrome
// @include	http://board.ogame.*/index.php?form=PostAdd&threadID=*
// @include	http://board.ogame.*/index.php?form=PostQuickAdd&threadID=*
// ==/UserScript==

(function() {
var css = "* {unicode-bidi: normal; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("html");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

