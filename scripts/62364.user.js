// ==UserScript==
// @name           Autoblog cleaner
// @namespace      http://userscripts.org/users/118324
// @include        http://www.autoblog.com/*
// @exclude        http://www.autoblog.com/traffic/*
// @exclude        http://www.autoblog.com/_uac/*
// ==/UserScript==

//Uses Joan Piedra's jQuery loading method http://joanpiedra.com/jquery/greasemonkey/
//Loads jQuery from google, I figure they can afford the bandwidth easier than jQuery.com


//var GM_JQ = document.createElement('script');
//GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
//GM_JQ.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') {
	window.setTimeout(GM_wait,10);
    } else {
	$ = unsafeWindow.jQuery; letsJQuery();
    }
}
GM_wait();

function letsJQuery() {
    $('#h1,#main_dl,#main_tabs,#right_rail,.sponsor_area,#partner_feeds,#full_iphone_promo,#ab_footer,#ad-aolautos').remove();
    $('#main').css({'width':'90%', 'padding':'1em'});
	$('.info').hide();
	$('#content .post .lead_gal')
		.css({'float':'none','width':'100%'})
		.find('*')
		.css('float','none');
}
