// ==UserScript==
// @name           MyMedia HTML5
// @namespace      http://depairnet/twoolie
// @description    adds html5 Video tag to my media pages
// @include        https://mymedia.adelaide.edu.au/user/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (navigator.userAgent.indexOf("MSIE")) {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://visitmix.com/dlr/dlr.js'; // add script to allow silverlight to play mp4 file
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {
	//alert($); // check if the dollar (jquery) function works
	//alert($().jquery); // check jQuery version	
	var mp4url = $("#files_for_session table tbody tr td:contains(MP4)").parent().find("td").find("a").attr("href");
	var defaultplayerhtml = $("div#player").html();
	
	if (navigator.userAgent.indexOf("MSIE") >= 0) {
		var mimeType = 'video/wmv';
	} else {
		var mimeType = 'video/mp4';
	}
	
	if (navigator.userAgent.indexOf('Mozilla') >= 0) {
		$("div#player").html("<!-- first try HTML5 playback. if serving as XML, expand `controls` to `controls='controls'` and autoplay likewise -->" +
							"<video width='100%' height='100%' preload='metadata' controls>" +
							"	<!-- MP4 must be first for iPad! you must use `</source>` to avoid a closure bug in Firefox 3.0 / Camino 2.0! -->" +
							"	<source src='" + mp4url + "' type='" + mimeType + "'><!-- Safari / iPhone video --></source>" +
							"	<!-- fallback to Flash -->" +
							defaultplayerhtml +
							"</video>" +
							"<small>html5 video by twoolie</small>");
	}
}



