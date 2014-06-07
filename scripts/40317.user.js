// Allter+autofs user script.
// version 0.1
// 2009-01-11
// Copyright (c) 2009, Anton Goloborodko
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ---
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Allter+autofs", and click Uninstall.
//
// ---
//
// ==UserScript==
// @name          Allter+autofs
// @namespace     none
// @description   script to replace smb:// by file:///smb/ in allter results page
// @include       http://allter.mipt.ru/*
// @include       http://landex.mipt.ru/*
// ==/UserScript==

var allA = document.getElementsByTagName('a');
for (var i = 0; i < allA.length; i++) {
    a = allA[i];
	if (a.href.match("^smb:\/\/.*")) {
		a.href = a.href.replace("smb:\/\/","file:\/\/\/smb\/");
	}
}