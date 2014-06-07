// ==UserScript==
// @name           FunkySouls all links clickable
// @description    Make all links clickable
// @namespace      http://gamesouls.com/
// @include        http://forum.funkysouls.com/*
// @version        1.0.0
// ==/UserScript==

var items = document.querySelectorAll("#CODE");

for(var i = 0; i < items.length; i++) {
	items[i].innerHTML = items[i].innerHTML.replace(/http:\/\/.+?(?=<)/g, "<a href=\"$&\">$&</a>");
}