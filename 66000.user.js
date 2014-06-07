// ==UserScript==
// @name           NSFW Linkage
// @description	   Searches for all NSFW posts on Reddit.
// @namespace      http://userscripts.org/users/126140
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

	$ = unsafeWindow.jQuery;

	$(document).ready(function () {
		$('.nsfw-stamp').click(function() {
			window.location = "/search?q=NSFW";
		});
	});
