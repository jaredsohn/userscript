// ==UserScript==
// @name           Ika-Eliminador de Barra Inferior
// @autor          2-D (Ex-Reaper)
// @description    Elimina la barra inferior.
// @homepage       http://userscripts.org/scripts/show/113148
// @include        http://m*.ikariam.*/*
// @icon           http://img703.imageshack.us/img703/521/ikaedbi.jpg
// @exclude        http://board.ikariam.*/*

// ==/UserScript==
(function() {
var css = "body {overflow-x: hidden !important;}";
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