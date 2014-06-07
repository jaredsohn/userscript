// ==UserScript==
// @name           Sourceforge direct download link cleaner
// @namespace      scgtrp
// @include        http://sourceforge.net/*
// @include        http://www.sourceforge.net/*
// ==/UserScript==

(function() {
	var $ = unsafeWindow.jQuery;
	$('.direct-download').each(function() { $(this).attr('href', $(this).attr('href').replace(/\?.*/, '')); });
})();