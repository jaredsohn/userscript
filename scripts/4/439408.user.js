// ==UserScript==
// @name          Brak Comic Sans
// @namespace     http://userstyles.org
// @description	  Przywraca normalną czcionkę
// @author        suhy, edited: ufos
// @include       http://www.wykop.pl/*
// @include       http://www.wykop.pl/mikroblog*
// @include       http://www.wykop.pl/wpis*
// @include       http://www.wykop.pl/ludzie*
// @include       http://www.wykop.pl/moj*
// @include       http://www.wykop.pl/szukaj*
// @include       http://www.wykop.pl/dodatki/pokaz/*
// @include       http://www.wykop.pl/tag/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body { font-family: Arial, Helvetica, sans-serif !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
