// ==UserScript==
// @name          Gmail Logo Remover
// @namespace     http://userscripts.org/scripts/show/83324
// @author        Jake Paris after khaldoon sinjab
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {

// Use this line for no logo:
var css = '.a9 { display: none; } .no .nn[style="width: 172px; height: 65px;"] { width: 10px !important; }';

// Or instead use the next 2 lines to replace with your own logo ( 143px x 59px )
// var yourImage = 'http://yourwebsite.com/logo.jpg';
// var css = '.a9 { background: url("'+yourImage+'") no-repeat !important; }';



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
