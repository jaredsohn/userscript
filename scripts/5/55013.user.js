// ==UserScript==
// @name           SO Auto-Today
// @namespace      SO_AUTO_TODAY
// @description    Attempted fix for the wrong information shown in Recent Activity
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

// Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; GM_letsJQuery(); }
	}
	GM_wait();

// All your GM code must be inside this function
	function GM_letsJQuery() {
		$(function() {
			var link = $("#topbar a[href^='/users/recent/']:first");
			
			if(link.length) {
				var today = new Date();
				var UTCtoday = today.getUTCFullYear() + '-' + GM_fixNumber(today.getUTCMonth()+1) + '-' + GM_fixNumber(today.getUTCDate());
				var url = link.attr('href') + '?StartDate=' + UTCtoday + '&EndDate=' + UTCtoday;
				link.attr('href', url);
			}
		});
	}
	
	function GM_fixNumber(num) {
		if(num < 10) return '0' + num;
		return num;
	}