// ==UserScript==
// @name          Scramble
// @namespace     http://www.willcarle.com/greasemonkey
// @description	  Scrambles a elements on a webpage when a mouse hovers over it
// @author        Will Carle
// @homepage      http://www.willcarle.com/
// @include       *
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	
		$("a, img, p, h1, h2, h3, li, embed, dd, dt, input, span").hover(function() {
			
			$(this).css({"position": "relative", "z-index":"9999"});
			$(this).animate({"top":rand() + "px", "left":rand() + "px"});
		});
	
}
function rand()
{
	var h = Math.floor(Math.random()*(100));
	if(h % 2 == 0)
		h *= -1;
	return h;
}