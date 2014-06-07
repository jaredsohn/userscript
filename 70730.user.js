// ==UserScript==
// @name           WK Scroll Remover
// @namespace      Ranatama
// @description    Displays all the WK without the need to scroll
// @include        http://*animecubed.com/billy/bvs/worldkaiju.html
// ==/UserScript==


var wkBorder = document.evaluate("//form/div", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;



if (wkBorder != null){
	wkBorder.style.height = "auto";
	wkBorder.style.overflow = "visible";
}

