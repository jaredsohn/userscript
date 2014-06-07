// ==UserScript==
// @name        StumbleOut
// @version     1.4
// @author      raina
// @description Breaks the original link out of StumbleUpon frames.
// @license     http://www.gnu.org/licenses/gpl-3.0.txt
// @downloadURL https://userscripts.org/scripts/source/182820.user.js
// @updateURL   https://userscripts.org/scripts/source/182820.meta.js
// @namespace   http://userscripts.org/users/315152
// @include     http://www.stumbleupon.com/su/*
// @run-at      document-start
// @grant       none
// ==/UserScript==
(function() {
	"use strict";

	var link, iframe, digger = function() {
		if (iframe === undefined) {
			iframe = document.getElementById('tb-stumble-frame');
			if (iframe !== undefined) {
				window.location.href = iframe.src;
			}
		}
	};

	if (window.self === window.top) {
		link = window.location.href.replace(/www\.stumbleupon\.com\/su\/[^\/]*(\/:[^\/]*)?\//, '').replace(/\/#?$/, '');
		if (window.location.href !== link) {
			window.location.href = link;
		} else {
			document.addEventListener('readystatechange', digger, false);
		}
	}
}());
