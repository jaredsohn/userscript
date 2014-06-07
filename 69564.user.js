// ==UserScript==
// @name           Fefes Blog ohne Werbung
// @namespace      http://blog.fefe.de
// @description    Macht Fefes Blog werbefrei
// @include        http://blog.fefe.de/*
// @include        http://blog.refefe.de/*
// ==/UserScript==

var xpathZurWerbung = '//div[contains(div/i/text(),"Werbung")]';

var gefunden = document.evaluate(xpathZurWerbung,
		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

if(gefunden) {
	var node = gefunden.singleNodeValue;
	node.parentNode.removeChild(node);
}