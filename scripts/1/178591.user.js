// ==UserScript==
// @name        E-Reader-Forum font verdana
// @description Modifies the embedded CSS. "body" will have another font-family.
// @author		a.peter
// @include     http://www.lesen.net/*
// @grant		none
// @version     1.0
// ==/UserScript==

function addCss(cssString) {
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	document.getElementsByTagName('head')[0].appendChild(newCss);
}

addCss('body { font-family: Verdana,Arial,Helvetica,sans-serif;}')
