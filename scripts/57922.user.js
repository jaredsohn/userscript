// ==UserScript==
// @name           p3's låtlistor på spotify
// @namespace      www.icaaq.com
// @description    Länkar p3's låtar från låtlistan till spotify
// @include        http://www.sr.se/cgi-bin/p3/tabla/*
// ==/UserScript==
(function() {
	// Add jQuery  
		var GM_JQ = document.createElement('script');  
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';  
		GM_JQ.type = 'text/javascript';  
		document.getElementsByTagName('head')[0].appendChild(GM_JQ);  

	// Check if jQuery's loaded  
	function GM_wait() {  
		if(typeof unsafeWindow.jQuery == 'undefined') {
			window.setTimeout(GM_wait,100); }  
		else {
			$ = unsafeWindow.jQuery; letsJQuery();
		}  
	}  
	GM_wait();

	// All your GM code must be inside this function  
	function letsJQuery() {
		$(".playListTRon, .playListTR").each(function() {
			var $spotifyLink = $(document.createElement("a"));
			$spotifyLink.html($(document.createElement("img")).attr({"src":"http://www.spotify.com/favicon.ico","alt":"spotify"}).css("border","0"));
			$spotifyLink.attr("href","spotify:search:"+$(this).find(".playListArtist").text()+"+"+$(this).find(".playListTitle").text());
			$(this).append($spotifyLink);
		});
	}
})();