// ==UserScript==
// @name        PbNation Logo Goes To Forum
// @namespace   http://userscripts.org/users/23652
// @description Make the PbNation logo link go to the forum instead of the homepage
// @include     http://www.pbnation.com/*
// @version     1.0.0
// ==/UserScript==

var link = document.evaluate("//div[@class='hdrLogo']/a[@href]", document, null, 9, null).singleNodeValue;

if(link !== null) {
	link.setAttribute("href", "/forum.php");
}