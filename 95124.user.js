// ==UserScript==
// @name          Google Reader Friends Highlighter
// @namespace     http://unfurled.d.p
// @description   Highlight articles shared by friends 
// @include       http*://www.google.com*/reader*
// ==/UserScript==

var startColor='#DFF0FF', endColor='#FFFFFF';
document.getElementById('entries').addEventListener('DOMNodeInserted', OnNodeInserted, false);
function OnNodeInserted (event) {
	var entryContainer = event.target.getElementsByClassName('card-content')[0];
	var authorContainer = entryContainer.getElementsByClassName('entry-via')[0];
	if (authorContainer != undefined) entryContainer.setAttribute('style','background: -moz-linear-gradient(top, '+startColor+', '+endColor+')');
}