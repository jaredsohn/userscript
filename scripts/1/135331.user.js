// ==UserScript==
// @name        FiMFic Character Search Fixer
// @namespace   ShadowBlaze
// @description The FiMFic character selectors are broken, this fixes them.
// @include     http://www.fimfiction.net/*
// @version     1
// @require     http://code.jquery.com/jquery-1.7.2.js
// ==/UserScript==

$(function() {
	$(".select_character").click(function(event) {
		if ($(this).find('input.included').attr('checked')) {
			$(this).find('input.included').attr('checked', false);
			$(this).find('input.excluded').attr('checked', true);
		}
		else if ($(this).find('input.excluded').attr('checked')) {
			$(this).find('input.included').attr('checked', false);
			$(this).find('input.excluded').attr('checked', false);
		}
		else {
			$(this).find('input.included').attr('checked', true);
			$(this).find('input.excluded').attr('checked', false);
		}
		SelectCharacter($(this));
	});
	function SelectCharacter(link) {
		link.find('img').css("opacity", "1.0");
		if (link.find('input.included').attr('checked')) {
			link.find('img').attr('src', "//static.fimfiction.net/images/selected/include.png");
		}
		else if (link.find('input.excluded').attr('checked')) {
			link.find('img').attr('src', "//static.fimfiction.net/images/selected/exclude.png");
		}
		else {
			link.find('img').attr('src', "//static.fimfiction.net/images/selected/neutral.png");
			link.find('img').css("opacity", "0.5");
		}
	}
	$(".select_character").each(function(e) { SelectCharacter($(this)); });
});
