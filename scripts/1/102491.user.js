// ==UserScript==
// @name           bitcoin.org forum auto negative karma
// @namespace      .
// @include        http://www.bitcoin.org/smf/*
// @include        https://www.bitcoin.org/smf/*
// @include        http://bitcoin.org/smf/*
// @include        https://bitcoin.org/smf/*
// ==/UserScript==

// http://joanpiedra.com/jquery/greasemonkey/
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; jQuery_loaded(); }
}
GM_wait();

function jQuery_loaded() {
	$("td.poster_info div.smalltext a").each(function() {
		if ($(this).text() == "[ - ]") {
			$.ajax({type: "GET", url: $(this).attr("href"),});
		}
	});
}