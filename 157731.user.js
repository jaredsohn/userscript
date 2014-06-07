// ==UserScript==
// @name        PJ06 GlowNoMore
// @namespace   smk
// @include     http://projectrs06.com/*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
$(function() {
	$('span').each(function() {
		var o = $(this);
		var anchor = o.find('a');
		if(anchor.size() > 0) {
			if(anchor.find('span').size() > 0) {
				anchor.find('span').css('text-shadow', '');
			}
		}
	});
});