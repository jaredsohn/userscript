// ==UserScript==
// @name          Gmail Fixed Font
// @namespace     http://www.1pezershk.com
// @description	  Use a fixed font in gmail.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

// public domain
// massively based on http://www.1pezeshk.com

(function () {
	var style = document.createElement ("style");
	document.body.appendChild (style);
	var ss = document.styleSheets [document.styleSheets.length - 1];
	ss.insertRule (".mb, textarea.tb {font-family: Tahoma; font-size: 10pt; !important;}", 0);
}) ();