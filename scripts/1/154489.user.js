// ==UserScript==
// @name fix :3
// @description Replace :3 with a gif without that white pixel
// @include http://forums.somethingawful.com/showthread.php*
// @match http://forums.somethingawful.com/*
// ==/UserScript==
(function (global) {
	"use strict";

	var fixed_colon_3 = 'http://i.imgur.com/FUbPN.gif',

		fixer = function () {
			var colon_threes = global.document.querySelectorAll('img[title=":3:"]');

			Array.prototype.forEach.call(colon_threes, function (elem) {
				elem.src = fixed_colon_3;
			});
		};

	global.addEventListener('DOMContentLoaded', fixer, false);

	if (global.document.readyState === 'complete' || global.document.readySate === 'loaded' || global.document.readyState === 'interactive') {
		global.removeEventListener('DOMContentLoaded', fixer, false);
		fixer();
	}
}(this));