// ==UserScript==
// @name          Warez-Project Shoutbox Whore
// @namespace     http://www.warez-project.net/
// @description	  Makes the height of the shoutbox frame 100%
// @author        420MuNkEy
// @include       http://warez-project.net/*
// @include       http://*.warez-project.net/*
// ==/UserScript==
(function() {
var css = "span#shoutbox_frame{height: 100% !important;}";
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