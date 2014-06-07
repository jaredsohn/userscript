// ==UserScript==
// @name           Nasza-klasa rybak
// @include        http://nasza-klasa.pl/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	}
	else	{
		$ = unsafeWindow.jQuery; letsJQuery();
	}
}
GM_wait();
//code
function letsJQuery(){
	var column = $('.main_column_right').children().not('.cool_box_21.cool_box.profile_box');
        var sledz = $('#sledzik_box').add($('#might_know_box')).add($('flash_ad')).add($('#content_banner')).add('a[href="/sledzik"]').add('#allegro_box').add(column).add('embed');
	sledz.remove();
}