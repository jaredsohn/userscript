// ==UserScript==
// @name           RS with horizontal scroll
// @namespace      Horizontal_scroll_for_RS
// @description    Runescape with horizontal scroll
// @include        http://forum.runescape.com/*
// @include        http://services.runescape.com/m=*
// @include        http://www.runescape.com/*
// ==/UserScript==
// Author:         Latogato   http://userscripts.org/users/233916
var textNodes = document.evaluate('//style[contains(@type, "text/css")]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i=0;i<textNodes.snapshotLength;i++) {

	var node = textNodes.snapshotItem(i);

	var addscrollbar = document.createElement("style"); 
	addscrollbar.textContent = ".bodyBackgroundHead { overflow: visible; }";
	node.appendChild(addscrollbar);

	var addscrollbar = document.createElement("style"); 
	addscrollbar.textContent = ".bodyBackgroundHeadAdvert { overflow: visible; }";
	node.appendChild(addscrollbar);
		
 }