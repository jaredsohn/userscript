// ==UserScript==
// @name          Better Selected Text
// @namespace     http://userstyles.org
// @description	  Makes selected text more visible.
// @author        Jiguda

// ==/UserScript==
(function() {
var css = "::-moz-selection { color: #FF0000 ! important; background-color: #FDFF00 ! important; }";
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
