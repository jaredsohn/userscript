// OnJava Anchor script
// version 1.0
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "OnJava Anchor", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          OnJava Anchor
// @namespace     http://walter.rumsby.name/greasemonkey
// @description   Adds named anchors to heading elements in articles published on the onjava.com web site 
// @include       http://www.onjava.com/*
// ==/UserScript==

var elements = [document.getElementsByTagName('h3'), document.getElementsByTagName('h4')];

for (var i = 0; i < elements.length; i++) {
	for (var j = 0; j < elements[i].length; j++) {
		var headingEl = elements[i][j];
		var anchorEl = document.createElement('a');

		var anchor = headingEl.textContent.replace(/ /g, '_');

		anchorEl.setAttribute('name', anchor);
		anchorEl.setAttribute('href', (window.location.href.indexOf('#') > -1 ? window.location.href.substring(0, window.location.href.lastIndexOf('#')) : window.location.href) + '#' + anchor); 
		anchorEl.setAttribute('style', 'font-weight: normal; margin-left: 1em;');

		anchorEl.appendChild(document.createTextNode('#'));
		headingEl.appendChild(anchorEl);
	}
}

if (window.location.href.indexOf('#') > -1) {
	window.location.href = window.location.href;
}