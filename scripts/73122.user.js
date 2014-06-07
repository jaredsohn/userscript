// ==UserScript==
// @name           Computerbase flexibles Layout
// @namespace      local
// @include        http://*computerbase.de/*
// @exclude        http://*computerbase.de/forum/*
// ==/UserScript==
if (document.getElementById("page").getAttributeNode("class") == null) {
  document.getElementById("page").setAttributeNode(document.createAttribute("class"));
  document.getElementById("page").getAttributeNode("class").nodeValue = "fluid-width"
} else {
  if (document.getElementById("page").getAttributeNode("class").nodeValue.search(/fluid-width/) == -1) {
	document.getElementById("page").getAttributeNode("class").nodeValue = document.getElementById("page").getAttributeNode("class").nodeValue + " fluid-width";
  }
}