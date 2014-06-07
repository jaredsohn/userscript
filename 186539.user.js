// ==UserScript==
// @name        tem20
// @namespace   tem20
// @description Makes the background color of tem20's profile flash blue and red.
// @include     *.roblox.com/*=6147383
// @include     *.roblox.com/*=tem20
// @include     *.roblox.com/User.aspx?submenu=true
// @include     *http://web.roblox.com/User.aspx?submenu=true
// @include     *web.roblox.com/User.aspx?submenu=true
// @include     *.web.roblox.com/User.aspx?submenu=true
// @version     1
// ==/UserScript==

setInterval(function () {
	'use strict';
	document.body.setAttribute('style', 'background:blue !important');
	setTimeout(function () {
		document.body.setAttribute('style', 'background:red !important');
	}, 1000);
}, 1000);