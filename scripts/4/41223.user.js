// ==UserScript==
// @name           Pastebin fixup
// @namespace      http://freecog.net/2008/
// @description    Makes pastebin.com less annoyingly ugly.
// @include        http://pastebin.com/*
// @include        http://www.pastebin.com/*
// ==/UserScript==

function remove(el) {
	el = (typeof el === 'string') ? document.getElementById(el) : el;
	if (el) el.parentNode.removeChild(el);
}

remove("titlebar");
remove("menu");
Array.forEach(document.getElementsByTagName('iframe'), remove);

GM_addStyle([
	'body { background: white; color: white; }',
	'#content { margin: 0 !important; }',
	'#content > *:not(.syntax) { display: none; }',
	'.text { color: darkgrey; }',
	'.text .de1, .text .de2 { font-family: monospace; color: black; }'
].join('\n'));
