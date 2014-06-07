// ==UserScript==
// @name        OFM Shortcuts
// @author      mzs_123
// @namespace   ofm-shortcuts
// @include     http://www.onlinefootballmanager.co.uk*
// @version     1.0.0
// @updateURL      http://userscripts.org/scripts/source/155347.meta.js
// @downloadURL    http://userscripts.org/scripts/source/155347.user.js
// @require     http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// @description Shortcuts made for easier-use of OFM by mzs_123
// ==/UserScript==



shortcut.add("Shift+1", function() {
	// Shift + 1 -> http://www.onlinefootballmanager.co.uk/ControlCentre
	window.location.href = "http://www.onlinefootballmanager.co.uk/ControlCentre";

},{
	'disable_in_input':true
});

shortcut.add("Shift+2", function() {
	// Shift + 2 -> http://www.onlinefootballmanager.co.uk/League/Results
	window.location.href = "http://www.onlinefootballmanager.co.uk/League/Results";

},{
	'disable_in_input':true
});


shortcut.add("Shift+3", function() {
	// Shift + 3 -> http://www.onlinefootballmanager.co.uk/League/Standings
	window.location.href = "http://www.onlinefootballmanager.co.uk/League/Standings";

},{
	'disable_in_input':true
});


shortcut.add("Shift+4", function() {

	// Shift + 4 -> http://www.onlinefootballmanager.co.uk/Lineup
	window.location.href = "http://www.onlinefootballmanager.co.uk/Lineup";

},{
	'disable_in_input':true
});


shortcut.add("Shift+5", function() {

	// Shift + 5 -> http://www.onlinefootballmanager.co.uk/Account/Select
	window.location.href = "http://www.onlinefootballmanager.co.uk/Account/Select";

},{
	'disable_in_input':true
});


shortcut.add("Shift+0", function() {

	// Shift + 0 -> http://www.onlinefootballmanager.co.uk/Logout
	window.location.href = "http://www.onlinefootballmanager.co.uk/Logout";

},{
	'disable_in_input':true
});