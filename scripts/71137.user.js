// ==UserScript==
// @name           Marksmen Quick Throw
// @namespace      Ranatama
// @include        http://*animecubed.com/billy/bvs/festival.html
// ==/UserScript==


var triesElement = document.evaluate("//td/form[2]/input[5]", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;


triesElement.setAttribute("value", "100");

var selectElem = document.evaluate("//form[2]/font/input", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

selectElem.setAttribute("checked","true");