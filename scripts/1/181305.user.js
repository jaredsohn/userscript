// ==UserScript==
// @name           youtube_embed_open_on_youtube_fix
// @namespace      youtube_embed_open_on_youtube_fix
// @description    Fix the [YouTube] button and video title to always open a new tab in Firefox, instead of reusing the same tab
// @include	http://www.youtube.com/embed/*
// @include	https://www.youtube.com/embed/*
// @version        0.1
// ==/UserScript==

unsafeWindow.old_open = unsafeWindow.open;
unsafeWindow.open = function(url, target) {
	unsafeWindow.old_open.call(unsafeWindow, url, "_blank");
};
