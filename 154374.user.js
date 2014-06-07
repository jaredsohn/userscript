// ==UserScript==
// @name        mtl
// @namespace   smk
// @include     http://motherless.com/*
// @version     1
// @description Removes dumb sponsored videos.
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

(function($) {

	// Remove ad notice
	$('#anonymous-notice').remove();

	// Media-ad-thumbs
	$('#media-ad-thumbs').remove();
	
	// Remove search sponsored videos
	$('[rel^=AAAAA]').each(function() {$(this).remove(); });

	// Remove sponsored text
	$('small').remove();

	// Remove home page sponsored 
	$('[id^=media_AAAAAA]').closest('tr').remove();

	// Remove 'our friends' trash links from video pages
	var _ = 0;

	$('#content-jumplinks').ajaxComplete(function(e, x, s) {
		_++;
		if(_ == 2) {
			$(this).find('.media-linked').each(function(i,v) {
				if($(v).find('small').html().match(/premium\scontent/i)) {
					$(v).remove();
				}
			});
		}
	});

	// Remove right sidebar
	$('.right-side.sidebar').remove();

})(jQuery);jQuery.noConflict();