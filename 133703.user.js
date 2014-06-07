// ==UserScript==
// @name			Lowyat.net Cleaner
// @version			0.3
// @description		Cleans up Lowyat.net's ugly background images and advertisements
// @include			http*://forum.lowyat.net/*
// ==/UserScript==

/*global unsafeWindow: true, GM_addStyle: true  */

GM_addStyle("body { background: url('http://images-cdn.lowyat.net/forum/default/light-tile.gif') repeat scroll 0 0 transparent !important; }\
div#logostrip,div[id^='ads'],div.avatar { display: none !important; }");