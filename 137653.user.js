// ==UserScript==
// @name                Duolingo - black font
// @description	        This script will change the color of font on the page from #909090 to #202020
// @include				http://duolingo.com/*
// ==/UserScript==

$("ol, p, td, div.popover").css("color", "#202020");