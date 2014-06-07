// ==UserScript==
// @name          Twitter Logged in as
// @description   Displays a logged in screen name in top navigation.
// @namespace     http://codefairy.org/ns/userscripts
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @version       0.3
// @license       MIT License
// @work          Greasemonkey
// @work          GreaseKit
// @work          Google Chrome
// ==/UserScript==

new function() {
	var screen_name = (/\/([^\/]+)$/.exec(($('#profile_link')[0] || {}).href) || [])[1];
	if (!screen_name) return;

	var sign_out = Array.prototype.slice.call($('#header .top-navigation li a')).pop();
	sign_out.innerHTML += ': <strong>'+screen_name+'</strong>';

	function $(selector) {
		return document.querySelectorAll(selector);
	};
};
