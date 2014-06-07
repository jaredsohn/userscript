// ==UserScript==
// @name           Youtube random
// @namespace      moo
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://plugins.jquery.com/files/jquery.cookie.js.txt
// @include        http://*.youtube.com/watch*playnext_from=PL*
// ==/UserScript==



//Taken from http://blog.mastykarz.nl/jquery-random-filter/
jQuery.jQueryRandom = 0;
jQuery.extend(jQuery.expr[":"], {
	random: function(a, i, m, r) {
		if (i == 0) {
			jQuery.jQueryRandom = Math.floor(Math.random() * r.length);
		};
		return i == jQuery.jQueryRandom;
	}
});


$().ready(function() {
	

	dataurl = $("#watch-next-list").attr("data-watch-next-list-ajax");

	randomize = $("#watch-next-list-autoplay").clone()
	randomize.attr("id", "#watch-next-list-random")
	randomize.attr("data-button-action", "randomizetoggle")
	if ($.cookie("yt-randomize") == 1) {
		randomize.removeClass("autoplay-off")
		randomize.removeClass("autoplay-on")
		randomize.text("Randomize (on)")
		randomize.appendTo("#watch-next-list-actions .yt-uix-button-group:first")
	} else {
		randomize.removeClass("autoplay-off")
		randomize.removeClass("autoplay-on")
		randomize.text("Randomize (off)")
		randomize.appendTo("#watch-next-list-actions .yt-uix-button-group:first")
		return
	}	

	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://www.youtube.com"+dataurl,
		onload: function(responseDetails) {
			$("#watch-next-list-body").empty()
			z = $(responseDetails.responseText, unsafeWindow.document).appendTo("#watch-next-list-body")
			$("#watch-next-list").attr("data-loaded", "true")
			unsafeWindow.yt.config_.LIST_PLAY_NEXT_URL_WITH_AUTOPLAY = $("#watch-next-list-body a:random").attr("href")+"&fmt=18"
			unsafeWindow.yt.config_.LIST_PLAY_NEXT_URL = unsafeWindow.yt.config_.LIST_PLAY_NEXT_URL_WITH_AUTOPLAY;
			unsafeWindow.yt.config_.LIST_AUTO_PLAY_ON = true
			$("#watch-next-list-body-collapsed li:first").empty()
			$("#watch-next-list-body a:random").appendTo("#watch-next-list-body-collapsed li:first")
			
			$("#watch-next-list-autoplay").removeClass("autoplay-off")
			$("#watch-next-list-autoplay").addClass("autoplay-on")
			$("#watch-next-list-autoplay span").text("Autoplay (on)")
			setTimeout("yt.net.delayed.load('next-list')", 500)
			
		}
	});
});

unsafeWindow.randomizetoggle = function() {
	if ($.cookie("yt-randomize") == 1) {
		randomize.removeClass("autoplay-off")
		randomize.removeClass("autoplay-on")
		randomize.text("Randomize (off)")
		randomize.appendTo("#watch-next-list-actions .yt-uix-button-group:first")
		$.cookie("yt-randomize", 0)
	} else {
		randomize.removeClass("autoplay-off")
		randomize.removeClass("autoplay-on")
		randomize.text("Randomize (on)")
		randomize.appendTo("#watch-next-list-actions .yt-uix-button-group:first")
		$.cookie("yt-randomize", 1)

	}
	
}