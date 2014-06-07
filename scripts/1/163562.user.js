// ==UserScript==
// @name        ISFDB Save Search Type
// @namespace   http://xtina.dreamwidth.org
// @description Saves the search type on the Search Results page.
// @include     http://www.isfdb.org/*
// @version     1
// ==/UserScript==

var type = document.getElementById("statusbar").childNodes[1].innerHTML;
type = type.substr(6, type.length - 13);
if (type == 'Fiction Title') type = 'Fiction Titles';
if (type == 'Title') type = 'All Titles';

var sBox = document.forms["searchform"].elements["type"];
for (var x = 0; x < sBox.options.length; x++) {
	if (sBox.options[x].text == type) {
		sBox.selectedIndex = x;
		break;
	}
}