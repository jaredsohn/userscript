// ==UserScript==
// @name        YololyoBuster
// @namespace   smk
// @include     http://yololyo.com/*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
(function($) {
	$('script').remove();
	setTimeout(function() {
		$('ui-locker-facebook.ui-locker-mozilla.ui-locker-facebook-style').remove();
		$('[id^=lock-]').show();
	}, 1500);
})(jQuery);jQuery.noConflict();;