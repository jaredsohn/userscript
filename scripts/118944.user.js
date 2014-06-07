// ==UserScript==
// @name PiWroteShitReply
// @namespace Paprikachu
// @description Adds "Quark, mal wieder, leider." to a reply to Pi's post.
// @include http://www.c-plusplus.de/forum/quote*
// ==/UserScript==

String.prototype.startsWith = function(s)
{
	return this.substr(0, s.length) == s;
}

var edit = document.getElementsByTagName("textarea")[0];

if(edit.innerHTML.startsWith("[quote=\"314159265358979\"]"))
{
	edit.innerHTML += "\nQuark, mal wieder, leider.\n";
	edit.focus();
}