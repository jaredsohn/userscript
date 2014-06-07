// ==UserScript==
// @name flickrfixr
// @namespace http://alanfineberg.com/greasemonkey/flickrfixr
// @description makes photostream faster, by not refreshing the page
// @include http://www.flickr.com/photos/*

 // ==/UserScript==
// Greasemonkey integration courtesy of Joan Piedra (http://www.joanpiedra.com/jquery/greasemonkey).
// The flickr-specific bits are at the end of the file.
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


// All your GM code must be inside this function
 function letsJQuery() {
     $('.nextprev_thumb').live('click', function(evt){
         evt.preventDefault();
         previewSrc = $(this).attr('src');
         // if these styles aren't removed the picture will get all stetchy
         $('.reflect').removeAttr('width');
         $('.reflect').removeAttr('height');
         // drop in the new full-size image
         $('.reflect').attr('src', previewSrc.replace('_s.jpg', '.jpg'));
     });
}