// ==UserScript==
// @name           Tatoeba Identicons
// @namespace      Jakob V. <jakov@gmx.at>
// @description    Replaces the default profile picture with Gravatar identicons for easier visual recognition
// @include        http://anonymouse.org/cgi-bin/anon-www_de.cgi/http://tatoeba.org/*
// @include        http://tatoeba.org/*
// @require        http://code.jquery.com/jquery-1.5.js
// @require        https://raw.github.com/unlight/Identicon5/master/jquery.identicon5.js
// @require        http://www.itsyndicate.ca/gssi/jquery/jquery.crypt.js
// ==/UserScript==
$(document).ready(function () {
	force_identicon = false; // change to true to show identicons instead of the users profile image
	$("img[src^='http://anonymouse.org/cgi-bin/anon-www_de.cgi/http://flags.tatoeba.org/img/profiles_'], img[src^='http://flags.tatoeba.org/img/profiles_']").each(function () {
		src = $(this).attr('src').split('/');
		img = src.pop();
		cat = src.pop();
		img_size = (cat == "profiles_128" ? 128 - (2 * 2) : 36 - (2 * 2));
		if (img == 'unknown-avatar.png' || force_identicon) {
			name = $(this).attr('alt');
			if (!name || name == "") {
				name = $(this).parent().parent().parent().find('.author').text();
			}
			if (name) {
				icon = $('<span></span>');
				md5 = $().crypt({
					method: "md5",
					source: name.trim()
				});
				icon.html(md5).identicon5({
					size: img_size
				});
				$(this).replaceWith(icon.find('canvas').css({
					'padding': '2px',
					'outline': '1px dashed lightGrey',
					'outline-offset': '-1px',
					'float': 'left' // float:left is for profile view, padding and outline are there to easier recognize that it is an identicon
				})); 
			}
		}
	});
});