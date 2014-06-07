// ==UserScript==// @name          Gmail Fixed Font// @namespace     http://evain.net/greasemonkey/// @description	  Use a fixed font in gmail.// @include       http://mail.google.com/*// @include       https://mail.google.com/*
// ==/UserScript==

// public domain
// massively based on http://userscripts.org/scripts/show/2431(function () {	var style = document.createElement ("style");	document.body.appendChild (style);	var ss = document.styleSheets [document.styleSheets.length - 1];	ss.insertRule (".mb, textarea.tb {font-family: MonoSpace; font-size: 9pt; !important;}", 0);}) ();