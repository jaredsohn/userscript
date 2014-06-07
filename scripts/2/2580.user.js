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
// select "Myspace formatting shortcuts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Myspace blank discussion page fixer
// By Jonatron - sjhu52i02@sneakemail.com - http://www.myspace.com/negatron
// version 0.001
// 2006-1-10
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// It could also probably remove the link when it leads to a blank page 
// based on the "Listing number-number of number", but I'm not doing that
// right now.
//
// ==UserScript==
// @name          Myspace blank discussion page fixer
// @namespace     http://mysite.verizon.net/negatron/
// @description   Due to a stupid off-by-one error, discussions sometimes present you with a blank page.  This goes back one page when it happens.
// @include       http://*.myspace.com/*
// ==/UserScript==

// If the page has text of the form "Listing 16-16 off 16"
if (document.body.innerHTML.match(/Listing\s(\d+)-\1\sof\s\1/)) {
	// Find the page number in the URL
	pagenumber = window.location.toString().match(/page\=(\d+)/)[1]
	// Go back one page
	window.location.href = window.location.href.replace("&page=" + pagenumber, "&page=" + (pagenumber - 1))
}