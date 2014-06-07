// ==UserScript==
// @name           PokerTube Downloader
// @namespace      http://userscripts.org/users/45791
// @description    Adds download links for the videos on PokerTube.com
// @include        http://www.pokertube.com/*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
$("param").each(function() {
	if ($(this).attr("name") == "flashvars") {
		var val = $(this).attr("value")
		var movieId = val.substring(
				val.indexOf("movieId=") + 8,
				val.indexOf("&", val.indexOf("movieId=") + 8)
		)
		
		var loc = "http://www.pokertube.com/playlist.ashx?movieId=" + movieId
		$.get(loc, function(xml) {
			var titleString = $("title:first", xml).text()
			var videoLink = $("file:first", xml).text()
			$(".MediaPlayerContainer").after("<div class=\"fatty red movieListsMenu\"><a href=\"" + videoLink + "\">&raquo; Download " + titleString + " &laquo;</a></div>")
		})
	}
})