// ==UserScript==
// @name        scroll
// @namespace   http://userscripts.org/users/Scuzzball
// @include     http://thedeepestsite.com/
// @version     1.0
// ==/UserScript==

var pageScroll = function() {
	window.scrollBy(0,1); // horizontal and vertical scroll increments
	scrolldelay = setTimeout(pageScroll,100); // scrolls every 100 milliseconds
};

setTimeout(pageScroll,10000);

/*var pageScroll = function() {
	alert('tot');
	jQuery(document).scrollTop(jQuery(document).height());
	setTimeout(pageScroll,100);
}
setTimeout(pageScroll,5000);*/