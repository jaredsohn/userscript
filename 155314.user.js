// ==UserScript==
// @name        DhiRLS Shortcuts
// @author      M4TRiX
// @namespace   dhirls-shortcuts
// @include     http://dhirls.net/*
// @include     http://forum.dhirls.net/*
// @include     http://img.dhirls.net/*
// @version     1.0.0
// @updateURL      http://userscripts.org/scripts/source/155314.meta.js
// @downloadURL    http://userscripts.org/scripts/source/155314.user.js
// @require     http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @description Shortcuts made for ease-use
// @icon           http://forum.dhirls.net/favicon.ico
// @icon64         http://forum.dhirls.net/favicon.ico
// ==/UserScript==



shortcut.add("Shift+1", function() {
	// Shift + 1 -> http://dhirls.net/
	window.location.href = "http://dhirls.net/";

},{
	'disable_in_input':true
});

shortcut.add("Shift+2", function() {
	// Shift + 2 -> http://forum.dhirls.net/forum.php
	window.location.href = "http://forum.dhirls.net/forum.php";

},{
	'disable_in_input':true
});


shortcut.add("Shift+6", function() {
	// Shift + 6 -> http://forum.dhirls.net/search.php?do=getnew&contenttype=vBForum_Post
	window.location.href = "http://forum.dhirls.net/search.php?do=getnew&contenttype=vBForum_Post";

},{
	'disable_in_input':true
});


shortcut.add("Shift+4", function() {

	// Shift + 4 -> http://forum.dhirls.net/usercp.php
	window.location.href = "http://forum.dhirls.net/usercp.php";

},{
	'disable_in_input':true
});


shortcut.add("Shift+5", function() {

	// Shift + 5 -> http://forum.dhirls.net/private.php
	window.location.href = "http://forum.dhirls.net/private.php";

},{
	'disable_in_input':true
});


shortcut.add("Shift+3", function() {

	// Shift + 3 -> http://img.dhirls.net/
	window.location.href = "http://img.dhirls.net/";

},{
	'disable_in_input':true
});

shortcut.add("Shift+0", function() {

	// Shift + 0 -> http://forum.dhirls.net/online.php
	window.location.href = "http://forum.dhirls.net/online.php";

},{
	'disable_in_input':true
});