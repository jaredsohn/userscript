// ==UserScript==
// @id             www.youtube.com-6be613b6-88c5-4d98-9f4e-76f8d49baea3@scriptish
// @name           Youtube Playlists - Add Video Title
// @version        1.1
// @description    Shows video title from deleted videos in your playlists.
// @include        http://youtube.com/playlist?*
// @include        https://youtube.com/playlist?*
// @include        http://*.youtube.com/playlist?*
// @include        https://*.youtube.com/playlist?*
// @run-at         document-end
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$('document').ready(function () {
	//"use strict";
	$('li.playlist-video-item').each(function () {
		var container_item = $(this).find('a.yt-uix-tile-link.yt-uix-sessionlink');
		var container_title = $(container_item).children('span.title');
		var title = $(container_title).html();
		var url = $(container_item).attr('href');
		if(title.match(/\[(Deleted|Private) Video\]/)) {
			var youtubeid = url.match(/v=(.+?)\&/)[1];
			console.log(youtubeid);
			$(container_title).html(youtubeid);
			$(this).css('background-color', '#ffc0c0');
			$(container_item).attr('href', 'javascript:;');
			$(container_title).html('<input type="text" value="' + youtubeid + '"> ' +
				'<a style="color:#222" href="https://www.google.com/search?q=' + youtubeid + '">[Search ID on Google]</a> ' + 
				'<a style="color:#222" href="/watch?v=' + youtubeid + '">[Go to video page]</a> ');
		}
	});
});