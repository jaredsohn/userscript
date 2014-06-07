// ==UserScript==
// @name GMail userscript
// @author x-90
// @version 2.0
// @include https://mail.google.com/*
// @description Hides google chat; Add links to google tasks and google bookmarks
// ==/UserScript==

// Hide google chat:
function AddStyle(Style) {
	var style = document.createElement('style');
	style.type = "text/css";
	style.innerHTML = Style;
	document.getElementsByTagName('head')[0].appendChild(style);
};

AddStyle(".pS.s {display:none !important}");

// Add links:
var lnk = document.getElementById('gbar').getElementsByTagName('nobr')[0]
lnk.innerHTML += '&nbsp;<a href="https://mail.google.com/tasks/canvas" target="_blank">Google Tasks</a>';
lnk.innerHTML += '&nbsp;<a href="https://www.google.com/bookmarks/" target="_blank">Google bookmarks</a>';

