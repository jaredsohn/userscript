// ==UserScript==
// @name        Top-bar sponsor ad remover for The Pirate Bay
// @namespace   LouisTakePILLz
// @updateURL   https://userscripts.org/scripts/source/171831.meta.js
// @downloadURL https://userscripts.org/scripts/source/171831.user.js
// @license     Creative Commons Attribution-ShareAlike 3.0 Unported
// @description Removes the annoying top-bar sponsor ad on TPB
// @include     http*://thepiratebay.*/search/*
// @include     http*://*.thepiratebay.*/search/*
// @version     1.0
// @require     http://code.jquery.com/jquery-2.0.1.min.js
// @grant       none
// ==/UserScript==

$(document).bind('DOMNodeInserted', function(event) {
	$('[id^="hitchhacker"]').remove();
});