// ==UserScript==
// @name		Konachan/yande.re: Menu Arrows
// @namespace	Zolxys
// @description	Replaces the squares in the main menu bar which display rather small in Firefox and Chrome with downward pointing triangles that are a lot easier to click.
// @include	http://konachan.com/*
// @include	http://konachan.net/*
// @include	https://yande.re/*
// @version	1.1
// ==/UserScript==
var c = document.getElementById('header').getElementsByTagName('a');
for (var i = 0; i < c.length; i++)
 if (c[i].childNodes.length) {
	var o = c[i].firstChild;
	if (o.nodeType == 3) {
		if (o.data.trim() == '\u25A0')
		 o.data = o.data.replace('\u25A0','\u25BC');
	}
}
