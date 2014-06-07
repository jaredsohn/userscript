// ==UserScript==
// @name           ComputerBase.de - Old Size + Use All Space
// @author         DeutscheMark
// @namespace      de-DE
// @include        http://www.computerbase.de/*
// @include        http://computerbase.de/*
// ==/UserScript==
function changeStyle() {
	document.body.style.margin = "0 0 0 0px";
	document.getElementById("page").style.margin = "0px auto 0";
	if (document.getElementById("page").getAttributeNode("class") == null) {
		document.getElementById("page").setAttributeNode(document.createAttribute("class"));
		document.getElementById("page").getAttributeNode("class").nodeValue = "fluid-width"
	} else {
		if (document.getElementById("page").getAttributeNode("class").nodeValue.search(/fluid-width/) == -1) {
			document.getElementById("page").getAttributeNode("class").nodeValue =      document.getElementById("page").getAttributeNode("class").nodeValue + " fluid-width";
		}
	}
}
changeStyle();