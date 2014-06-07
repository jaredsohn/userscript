// ==UserScript==
// @name           DeviantArt: Remove "Request as Print"
// @namespace      http://freecog.net/2007/
// @description    Removes the "Request as Print" link from DeviantArt pages, so that it can't be accidentally clicked (boy, that's embarassing!).
// @include        http://www.deviantart.com/deviation/*
// ==/UserScript==

var button = document.getElementById('printReq-button');

if (button) {
	button.parentNode.removeChild(button);
	var icon = document.getElementById('printReq-icon');
	if (icon) icon.parentNode.removeChild(icon);
}