// ==UserScript==
// @name           E-Reader-Forum border for cites
// @description    Modifies the embedded CSS. Elements containing class "quoteBox" will have a grey border.
// @author         a.peter
// @include        http://www.lesen.net/*
// @grant          none
// @version        1.0
// ==/UserScript==

function addCss(cssString) {
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	document.getElementsByTagName('head')[0].appendChild(newCss);
}

addCss('.quoteBox {border-width:1; border-color:grey;}')
