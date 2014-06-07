// ==UserScript==
// @name          Sans-Serif ONLY!
// @namespace     http://userstyles.org
// @description	  Changes ALL text to the default sans-serif font
// @author        Clorow
// @include       http://*
// @include       https://*
// ==/UserScript==
(function() {
var css = "body { font-family: sans-serif;}";
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
