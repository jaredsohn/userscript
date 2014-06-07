// ==UserScript==
// @name           Embed Soundcloud
// @namespace      evo
// @description    finds link to song on soundcloud and automatically embeds into the page
// @include        http://*.chilledtimes.com/*
// @include        http://chilledtimes.com/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined'){
		window.setTimeout(GM_wait,100);
	}
	else {
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	var soundcloud = $("a").filter(function() {
		var regex = /(\bhttp:\/\/soundcloud.com\/+([a-zA-Z0-9\/]*))/g;									
		return regex.test( $(this).attr("href") );
	});
	
	soundcloud.each(function(){
		
	var song = $(this).attr("href");
	
	var embed = '';
	
	embed += '<object height="81" width="100%">';
	embed += '<param name="movie" value="http://player.soundcloud.com/player.swf?url='+song+'&amp;g=bb"></param>';
	embed += '<param name="allowscriptaccess" value="always"></param>';
	embed += '<embed allowscriptaccess="always" height="81" src="http://player.soundcloud.com/player.swf?url='+song+'&amp;g=bb" type="application/x-shockwave-flash" width="100%">';
	embed += '</embed>';
	embed += '</object>';
	
	$(this).after( embed );
	
	});

	
}