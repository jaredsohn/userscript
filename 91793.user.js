// ==UserScript==
// @name           GA Show 100 Profiles/Accounts by Default
// @namespace      http://pa-th.net
// @author         Tharuka Pathirana (based on Chris Egner's original script)
// @version        1.0
// @include        https://www.google.com/analytics/settings*
// ==/UserScript==

var PAGE_SIZE = 100; // Set this to whatever you want the default to be

if ((window.location.href.match(/settings\/(\?|#|home)/) || window.location.href.match(/settings\/$/)) && !window.location.href.match(/pagesize=/)) {
	window.location.hash = window.location.hash ? window.location.hash + '&pagesize=' + PAGE_SIZE : '#pagesize=' + PAGE_SIZE;
}