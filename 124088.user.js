// ==UserScript==
// @name           FTN Style Design <Christmas>
// @namespace      feedthe.net
// @include        https://*feedthe.net/*
// @author 	   Code: reyder Design: tuNA
// @require http://panel2.woox.pl/FTN/style.js
// @version:	   0.1 alpha
// @date	   January 25th 2012
// ==/UserScript==

///Remove <img> left_statusbar and right_sta....
//var images = document.getElementsByClassName('inner_tl');
//while(images.length > 0) {
//    images[0].parentNode.removeChild(images[0]);
//}

(function() {
// gets the full CSS string - which is returned from a function
var css = Theme.cssTuna;

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

