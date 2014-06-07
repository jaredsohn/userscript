// ==UserScript==
// @name           Tatoeba Language Identicons
// @namespace      Jakob V. <jakov@gmx.at>
// @description    Replaces the flags with identicons of the language code's md5 hash
// @include        http://tatoeba.org/*
// @require        http://code.jquery.com/jquery-1.5.js
// @require        https://raw.github.com/unlight/Identicon5/master/jquery.identicon5.js
// @require        http://www.itsyndicate.ca/gssi/jquery/jquery.crypt.js
// ==/UserScript==
$(document).ready(function () {
	$("img[src^='http://flags.tatoeba.org/img/flags/']").each(function () {
		src = $(this).attr('src').split('/');
		name = src.pop().split('.')[0];

		icon = $('<span></span>');
		md5 = $().crypt({
			method: "md5",
			source: name.trim()
		});
		icon.html(md5).identicon5({
			size: 20
		});
		$(this).replaceWith(icon.find('canvas').css({
			'padding': '2px',
			'outline': '1px dashed lightGrey',
			'outline-offset': '-1px',
			'float': 'right'
		}));

	});
});