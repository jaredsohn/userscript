// ==UserScript==
// @name unixbeard's request
// @description plays this song whenever im reading a page with a pissflaps post http://www.youtube.com/watch?v=7CiOWcUVGJM also make all the posts pictures of kate bush and kate moss fizzbuzz style
// @include http://forums.somethingawful.com/showthread.php*
// @match http://forums.somethingawful.com/*
// ==/UserScript==
/*jslint browser: true, plusplus: true */
(function () {
	"use strict";
	var embed = '<object style="height: 390px; width: 640px"><param name="movie" value="http://www.youtube.com/v/7CiOWcUVGJM?version=3&feature=player_detailpage&autoplay=1"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="http://www.youtube.com/v/7CiOWcUVGJM?version=3&feature=player_detailpage&autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="360"></object>',
		bush = "http://i.imgur.com/pVF7t.jpg",
		moss = "http://i.imgur.com/pJoJJ.jpg",
		div,
		posts,
		p,
		imgz;

	if (document.querySelector('ul.profilelinks a[href$="userid=31177"]')) {
		div = document.createElement('div');
		div.innerHTML = embed;
		document.body.appendChild(div);

		posts = document.querySelectorAll('.postbody');

		for (p = 2; p < posts.length; p++) {
			imgz = '';

			if ((p + 1) % 3 === 0) {
				imgz += '<img src="' + bush + '">';
			}
			if ((p + 1) % 5 === 0) {
				imgz += '<img src="' + moss + '">';
			}

			posts[p].innerHTML = imgz;
		}
	}
}());
