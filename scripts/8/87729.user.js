// ==UserScript==
// @name           google-domain-for-yelp
// @namespace      google-yelp
// @include        *
// ==/UserScript==
var $;


// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}
function letsJQuery() {
    $('body').after('<a href="http://www.google.com/search?client=safari&rls=en&q=yelp+site:'+window.location.host.replace('www.', '')+'&ie=UTF-8&oe=UTF-8" style="position: absolute; top: 10px; left: 20px;">CLICK ME TO SEARCH GOOGLE</a>');
}