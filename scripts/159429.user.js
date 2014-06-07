// ==UserScript==
// @name     Zynga Game Feed Grabber - Coasterville
// @description  Script for helping to claim items on the Zynga sidebar feed of Coasterville
// @include  http*://zynga.com/play/coasterville/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @updateURL https://userscripts.org/scripts/source/159429.meta.js
// @downloadURL https://userscripts.org/scripts/source/159429.user.js
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_listValues
// @grant GM_log
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @exclude  http*://apps.facebook.com/coasterville/*
// @version  3.0.8.0
// ==/UserScript==

$(document).ready(function () {
	setTimeout(function () {
		var cE1 = document.createEvent('MouseEvents');
		cE1.initEvent('click', true, false);
		$(".zui_zdc_common_rail_minmaxbutton_icon")[0].dispatchEvent(cE1);
	}, 8000);
});
//Experimental section end*************************
$(document).ready(function () {
	setTimeout(function () {
		alert('Notice: This script is no longer supported, please remove it, and use zGrabber Ultimate instead');
	}, 8000);
});