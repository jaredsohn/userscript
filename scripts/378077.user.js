// ==UserScript==
// @name		eRemoveNotifications
// @namespace	eRemoveNotifications
// @require		http://code.jquery.com/jquery-2.0.3.min.js
// @include		*erepublik.com/*
// @version		3.0
// @author		ZordaN
// ==/UserScript==

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery;
		StartFunction();
	}
}
GM_wait();

function StartFunction() {
	$(document).ready(function () {
		$("#notification_area").remove();
	});
}