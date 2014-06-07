// ==UserScript==
// @name          Gmail - Add Row Highlights
// @namespace     http://userstyles.org
// @description	  Highlights the letter rows in the new Gmail when you hover over them with the mouse cursor
// @author        stasnikiforov
// @homepage      http://userstyles.org/styles/4725

// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); table.zt tr.yO:hover { background-color: rgb(255,235,134) !important;} table.zt tr.zE:hover { background-color: rgb(205,243,159) !important;}";
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
