// ==UserScript==
// @name Change google black bar
// @description Script make you google black bar to normal
// @include        http://*.google.*/*
// @version 1.40
// ==/UserScript==
(function() {
var css = ' 
#gbx3, #gbx4 {display:none !important;} 
.gbz0l .gbts {color: #000000;} 
.gbts {color: #3366cc;}; 
';
body {background: none repeat scroll 0 0 #000000 !important;}";
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