// ==UserScript==
// @name           RuTor.Org 
// @description    Упрощённый интерфейс без рекламы
// @author         Ареопагит
// @homepage       http://userscripts.org/scripts/show/79447
// @version        1.0
// @include        http://rutor.org/*
// @include        https://rutor.org/*
// @include        http://*.rutor.org/*
// @include        https://*.rutor.org/*
// ==/UserScript==

(function() {
var css = "";
if (false || (document.location.href.indexOf("http://rutor.org") == 0))
	css += "\ndiv[id=\"up\"],\ndiv[id=\"sidebar\"],\niframe {display: none !important;}\div#ws div#content {left: 10px;right: 10px;}\#menu {position: fixed !important;z-index: 1000000 !important;}\h1 {font-size: 19px;margin-top: 2em;margin-bottom: auto;text-align: center;}\h2 {font-size: 19px;margin-top: 2em;margin-bottom: auto;text-align: center;}";

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