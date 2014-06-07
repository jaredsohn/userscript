// ==UserScript==
// @author			Kitsuneymg
// @name			Google Sidebar Hider
// @namespace		http://google.com/kitsuneymg/googlesidebarhider
// @description		Auto-hides the left sidebar
// @include			http://*.google.*/*
// @include			https://*.google.*/*
// ==/UserScript==

(function(){
var css="\
#center_col\
{\
	margin-left: 0px;\
	border-left: none;\
}\
#leftnav\
{\
	-moz-binding: none;\
	display: none;\
}\
";
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

