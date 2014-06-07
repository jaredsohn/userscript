// ==UserScript==
// @name           Default Courier New font on metalink
// @namespace      http://userscripts.org
// @description    Replaces 'Arial/Courier' with "Courier New" fonts
// @include        https://metalink2.oracle.com/*
// @author         Jinghao Li
// ==/UserScript==

var elementList = document.getElementsByTagName('*');
	for (var i = elementList.length - 1; i >= 0; i--) {
		var elementItem = elementList[i];
		var style = getComputedStyle(elementItem, '');
		elementItem.style.fontFamily = style.fontFamily.replace('Arial','Courier New');
		elementItem.style.fontFamily = style.fontFamily.replace('Courier','Courier New');
	}