// ==UserScript==
// @name          Jarochos.net - Tema obscuro de HLY
// @namespace     http://userstyles.org
// @description	  Necesario para correcto funcionamiento del script de Greasemonkey para opacar la página de Jarochos.
// @author        HuLeeYo
// @homepage      http://userstyles.org/styles/18673
// @include       http://www.jarochos.net/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); html, body { background-color: black !important; }";
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
