// ==UserScript==
// @name			Picoodle imagehost redirector
// @namespace		http://pecet.jogger.pl
// @description		Redirects the viewpage of picoodle to image itself. Inspired by "Universal imagehost redirector" GM script which doesn't support picoodle.
// @include		http://www.picoodle.com/view.php?img=*
// ==/UserScript==

var el = document.getElementsByTagName('input');
window.location.replace(el[2].value);