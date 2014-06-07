// ==UserScript==
// @name           Arabic Twitter
// @namespace      79747
// @description    Optimize Twitter with Arabic Users
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function () {
	var style = document.createElement ("style");
	document.body.appendChild (style);
	var ss = document.styleSheets [document.styleSheets.length - 1];
	ss.insertRule (".hentry {font-family: Tahoma;direction: rtl;text-align: right; font-size: 10pt; !important;}", 0);
}) ();