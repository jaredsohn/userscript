// ==UserScript==
// @name           MAL Show Images
// @version        1.0.0
// @namespace      http://userscripts.org/users/520145
// @description    Images don't work for most people, this should fix it for everyone.
// @license        Public Domain; http://creativecommons.org/publicdomain/zero/1.0/
// @include        http://myanimelist.net/forum/?topicid=*
// ==/UserScript==

/* global $ */
/* jshint unused:true */

$(document).ready( function() {
	$("img").each( function(i, element) {
		if(element.dataset.hasOwnProperty("src")) {
			element.src = element.dataset.src;
		}
	});
});
