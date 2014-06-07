// ==UserScript==
// @name           Glitch Auto-More
// @namespace      http://jebus905.kicks-ass.net:8081/
// @include        http://www.glitch.com
// @include        http://www.glitch.com/
// @include        http://www.glitch.com/#
// @description    Automatically clicks the "More..." link at the bottom of the screen when you scroll down to it.
// ==/UserScript==

/* Changelog:
	0.0.0 (2011/10/07)
		- Initial release
*/

// -------- start --------
(function() {

/**
 * unsafeWindow variables / functions
 **/
if (!(typeof unsafeWindow === 'undefined')) { 
	$ = unsafeWindow.$;
	window = unsafeWindow;
} 

function isScrolledIntoView(elem) {
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $(elem).offset().top;
	var elemBottom = elemTop + $(elem).height();

	return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
}

$(window).scroll(function() {
	if(isScrolledIntoView("#feed-more")) $("#feed-more").children()[0].click()
});

// -------- end --------
})();