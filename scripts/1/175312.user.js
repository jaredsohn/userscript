// ==UserScript==
// @name        weewooweewooweewooweewooweewoo
// @namespace   weewoo5
// @description Makes the background color of weewoo5's profile flash blue and red.
// @include     *.roblox.com/*=4987671
// @include     *.roblox.com/*=weewoo5
// @version     1
// ==/UserScript==

setInterval(function () {
	'use strict';
	document.body.setAttribute('style', 'background:blue !important');
	setTimeout(function () {
		document.body.setAttribute('style', 'background:red !important');
	}, 1000);
}, 1000);