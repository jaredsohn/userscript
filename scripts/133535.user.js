// ==UserScript==
// @name                        douban_shortcut
// @namespace              		douban_shortcut
// @version                     1.1
// @reason						Update for Greasemonkey 1.0 grant
// @author                      Mescoda on http://mescoda.com/
// @description              	Keyboard shortcuts for douban.com
// @include                     http://*.douban.com/*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @grant 						GM_addStyle
// ==/UserScript==

$(document).keydown(function(event) {
	if (event.which == 221) {
		$('.paginator .next a').get(0).click();
	}
	if (event.which == 219) {
		$('.paginator .prev a').get(0).click();
	}
})