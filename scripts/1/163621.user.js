// ==UserScript==
// @name        What.CD :: Clear notifications confirmation
// @author      Z4ppy
// @namespace   Z4ppy.What.CD
// @description Adds a confirmation popup for "clear all old" and "clear all old in filter" links on the notification page.
// @include     https://what.cd/torrents.php?action=notify*
// @grant       none
// @version     1.0
// @date        2013-03-30
// ==/UserScript==

var clearlinks = document.querySelectorAll('a[href*="torrents.php?action=notify_clear"]');
for (var i = 0; i < clearlinks.length; ++i) {
	clearlinks[i].addEventListener('click', function (e) {
		if(!confirm('Are you sure?')) {
			e.preventDefault(); e.stopPropagation(); return false;
		}
	}, true);
}