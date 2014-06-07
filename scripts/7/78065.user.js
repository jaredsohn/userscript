// ==UserScript==
// @name           Urbandictionary Lookup
// @namespace      urbandictionary
// @description    Highlight a word, press Ctrl-Alt-U and it will automagically be looked up in Urbandictionary!
// @include        *
// ==/UserScript==

document.addEventListener("keypress", udefine, true)

function udefine(ev) {
	if (ev.which == 117 && ev.ctrlKey && ev.altKey)
		GM_openInTab("http://urbandictionary.com/define.php?term="+window.getSelection().toString());
}