// ==UserScript==
// @name           Uniresta
// @namespace      https://www.userscripts.org/users/419132
// @description    Uniresta menu fix
// @include        http://www.uniresta.fi/*
// ==/UserScript==

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss ('div.sisalto_lounaslista { min-height: 600px !important; height: auto !important; }');