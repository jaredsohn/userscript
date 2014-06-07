// ==UserScript==
// @name Sneaking Mission :3
// @description why the fuck would you get rid of the pixel it's the best part of the smiley? the fuck is wrong with you
// @include http://forums.somethingawful.com/showthread.php*
// @match http://forums.somethingawful.com/*
// ==/UserScript==
(function (global) {
	"use strict";

	var fixed_colon_3 = 'http://i.imgur.com/wLJIr.png',

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