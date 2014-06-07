 // ==UserScript==
// @name vBulletin New Posts keyboard shortcut
// @namespace http://userscripts.org/scripts/Sivan
// @description Provides a keyboard shortcut for the New Posts feature
// ==/UserScript==

document.addEventListener("keypress", function(e) {

// Configure shortcut key (default: ctrl+`)
var KEY = '`';
var MODIFIER = "ctrlKey"; // ctrlKey, altKey, shiftKey
var NEW_POSTS_URL = "/search.php?do=getnew";

if(String.fromCharCode(e.which) == KEY && e[MODIFIER]) window.location.href = NEW_POSTS_URL;

}, true);
