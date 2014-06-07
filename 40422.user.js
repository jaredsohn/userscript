// ==UserScript==
// @name           GA Show 100 Rows by Default
// @author         Chris Egner (inspired by the Jon Hensen's original script)
// @company        EpikOne
// @namespace      http://www.google.com/analytics
// @include        https://www.google.com/analytics/settings*
// ==/UserScript==

var PAGE_SIZE = 100; // Set this to whatever you want the default to be

if (window.location.href.match(/pagesize=/)) {
	return;
}
else if (window.location.href.match(/settings\/(\?|home)/) || window.location.match(/&scid=/)) {
	window.location.replace(window.location.href + '#pagesize=' + PAGE_SIZE);
}
else if (window.location.href.match(/#scid=/)) {
    window.location.replace(window.location.href.replace(/#/,'&') + '&pagesize=' + PAGE_SIZE);
}