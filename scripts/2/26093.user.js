// ==UserScript==
// @name           Del.icio.us Tag Button - popup INPUT focus
// @description    Puts the insertion point in the Tag INPUT so you can start typing straight away
// @include        http://delicious.com/*
// @namespace     http://www.breheny.com
// NOTES____________________________________________
// version 0.1
// 2008-05-07
// Copyright (c) 2008, Rupert Breheny
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// NOTES ENDS_______________________________________
// ==/UserScript==
window.addEventListener("load", function(e) {
	document.getElementById("tags").focus();
}, false);