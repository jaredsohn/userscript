// ==UserScript==
// @name        HS script - Shortcuts
// @author      Negative#
// @namespace   hs-shortcuts
// @include     http://hacksociety.net/*
// @include     http://hacksociety.info/*
// @include     http://hacksociety.us/*
// @version     1.0.2
// @require     http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @description Shortcuts made for ease-use
// @downloadURL    http://userscripts.org/scripts/source/148666.user.js
// @updateURL      http://userscripts.org/scripts/source/148666.user.js
// @icon           http://hacksociety.net/images/darkrev/hs.jpg
// @icon64         http://hacksociety.net/images/darkrev/hs.jpg
// @history        Created the userscript
// @history        Added Shift+6 --> Who's online
// @history        Changed Shift+5 to Show new threads
// ==/UserScript==



shortcut.add("Shift+1", function() {
	// Shift + 1 -> http://hacksociety.net/portal.php
	window.location.href = "http://hacksociety.net/portal.php";

},{
	'disable_in_input':true
});

shortcut.add("Shift+2", function() {
	// Shift + 2 -> http://hacksociety.net/index.php
	window.location.href = "http://hacksociety.net/index.php";

},{
	'disable_in_input':true
});


shortcut.add("Shift+3", function() {
	// Shift + 3 -> http://hacksociety.net/search.php?action=getdaily
	window.location.href = "http://hacksociety.net/search.php?action=getdaily";

},{
	'disable_in_input':true
});


shortcut.add("Shift+4", function() {

	// Shift + 4 -> http://hacksociety.net/private.php
	window.location.href = "http://hacksociety.net/private.php";

},{
	'disable_in_input':true
});

shortcut.add("Shift+5", function() {

	// Shift + 5 -> http://hacksociety.net/search.php?action=getnew&showresults=threads
	window.location.href = "http://hacksociety.net/search.php?action=getnew&showresults=threads";

},{
	'disable_in_input':true
});


shortcut.add("Shift+7", function() {

	// Shift + 7 -> http://hacksociety.net/usercp.php
	window.location.href = "http://hacksociety.net/usercp.php";

},{
	'disable_in_input':true
});


shortcut.add("Shift+6", function() {

	// Shift + 6 -> http://hacksociety.net/online.php
	window.location.href = "http://hacksociety.net/online.php";

},{
	'disable_in_input':true
});
