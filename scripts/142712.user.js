// ==UserScript==
// @name Beatser
// @description add "with Beats Audio" to the end of all thread titles
// @include http://forums.somethingawful.com/showthread.php*
// @include http://forums.somethingawful.com/forumdisplay.php*
// @match http://forums.somethingawful.com/forumdisplay.php*
// @match http://forums.somethingawful.com/showthread.php*
// ==/UserScript==

/*jslint browser:true, plusplus: true */
/*global $:false */
(function () {
	"use strict";

	var threadPattern = /showthread\.php/,
		forumPattern = /forumdisplay\.php\?forumid=219/,

		beatser = function (elem) {
			var title = elem.textContent || elem.innerText;

			title += ' with Beats Audio';

			if (elem.textContent) {
				elem.textContent = title;
			} else {
				elem.innerText = title;
			}
		},
		titles,
		t;

	if (threadPattern.test(window.location.href)) {
		titles = document.querySelectorAll('.bclast');
	} else if (forumPattern.test(window.location.href)) {
		titles = document.querySelectorAll('.thread_title');
	}

	for (t = 0; t < titles.length; t++) {
		beatser(titles[t]);
	}

}());