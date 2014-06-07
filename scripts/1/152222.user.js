// ==UserScript==
// @name        allegro - nowe + kup teraz
// @namespace   http://userscripts.org/scripts/show/152222
// @include     http://allegro.pl/*
// @version     1
// @require     http://code.jquery.com/jquery-1.7.1.min.js
// @grant       none
// ==/UserScript==

var paramsBox =  $("#paramsTopWrap");
if (paramsBox.length == 1) {
	var url = window.location.href;
	if (url.indexOf('?') >= 0) {
		url = url.replace(/buy\=\d+\&?/, '').replace(/offer_type\=\d+\&?/, '') + '&';
	} else {
		url = url + '?';
	}
	url = url + 'buy=4&offer_type=1'

	var link = $('<a style="float:right; font-size:14px; padding-right: 10px; font-family: Verdana;">Nowe + Kup Teraz</a>')
		.attr('href', url)
		.insertBefore(paramsBox.find('.filterOptionsWrapper h2'));
}
