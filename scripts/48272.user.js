// ==UserScript==
// @name           AntiLinkCW!
// @namespace      AntiLinkCW
// @include        http://casitaweb.net/post/*
// ==/UserScript==

do {
	document.body.innerHTML = document.body.innerHTML.replace('<a href="http://link.casitaweb.net/index.php?l=','<a title="Anti CW! Link" href="');
} while(document.body.innerHTML.indexOf('<a href="http://link.casitaweb.net/index.php?l=') != -1);
void 0;