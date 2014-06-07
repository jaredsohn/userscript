// ==UserScript==
// @name          Facebook Left Sidebar
// @description	  Switches the stream and highlights columns on the home page.
// @author        Zachary Liu
// @include       http://www.facebook.com/*
// ==/UserScript==

(function() {
var css = "#home_left_column { float: right !important; margin: -3px 0 0 20 !important; } #home_sidebar { margin: 0 !important; }";
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
