// Washington Post RSS query string remover user script
// 2005-06-05
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Washington Post RSS Query String Remover
// @namespace     http://www.marteydodoo.com
// @description   removes query string from pages loaded from Washington Post RSS
// @include       http://www.washingtonpost.com/wp-dyn/content/article/*
// @include       http://washingtonpost.com/wp-dyn/content/article/*
// @include       http://www.washingtonpost.com/wp-dyn/articles/*
// @include       http://washingtonpost.com/wp-dyn/articles/*
// ==/UserScript==

if(window.location.search != ''){
	window.location.href = window.location.protocol+'//'+window.location.host+window.location.pathname
}