// ==UserScript==
// @name           No new tabs/windows
// @namespace      Chaology
// @description    Removes target from <a>
// @include        *
// ==/UserScript==

for (var i = 0; i < document.links.length; i++) {
	var link = document.links[i];
	link.removeAttribute('target');
}