// Anonymouse
// 2005-10-26
// Public Domain
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
// select "Anonymouse", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Anonymouse
// @description   surf the web anonymously
// @include       *
// @exclude       http://anonymouse.org/*
// ==/UserScript==

(function() {
	window.location.href = 'http://anonymouse.org/cgi-bin/anon-www.cgi/' + window.location.href;
})();
