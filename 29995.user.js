// ==UserScript==
// @name           Default monospace font
// @description    Replaces "Courier" and "Courier New" fonts with your default monospace font on all web pages
/ @author        Dave Cortright
// @namespace      kpao.org
// @version        1.01
// @date            2011-07-04
// @include        *
// ==/UserScript==
// Inspired by "Sans-Serif Default" from Peter Farmer

var elementList = document.getElementsByTagName('*');
	for (var i = elementList.length - 1; i >= 0; i--) {
		var elementItem = elementList[i];
		var style = getComputedStyle(elementItem, '');
		elementItem.style.fontFamily = style.fontFamily.replace('Courier New', 'monospace');
		elementItem.style.fontFamily = style.fontFamily.replace('Courier', 'monospace');
	}
