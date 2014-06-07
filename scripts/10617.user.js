// ==UserScript==

// @name           wiktionary tabs

// @namespace      wik

// @include        *

// ==/UserScript==
window.addEventListener('keypress', keypress, true);
function keypress(e)
{
	if(String.fromCharCode(e.which) != GM_getValue('key', 'w')) return;
	GM_openInTab("http://en.wiktionary.org/wiki/" + window.getSelection());
}
