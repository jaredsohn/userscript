// ==UserScript==
// @name        GitHub Your Fork
// @namespace   https://github.com
// @description Shows a 'forked to' button below the title
// @include     https://*github.com/*
// @version     1.0.1
// @grant		none
// ==/UserScript==

(function($) {
	
	if ($('h1.entry-title').length > 0 && $('h1 .fork-flag').length === 0) {
		var username = String.trim($('a.name').text());
		var repository = $('.js-current-repository').html();
		$('.entry-title').append('<span class="fork-flag"><span class="text">your fork is at <a href="/' + username + '/' + repository + '">' + username + '/' + repository + '</a></span></span>');
	}

})(jQuery);