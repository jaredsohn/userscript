// ==UserScript==
// @name        Google on My MSN
// @namespace   http://localhost
// @description Use Google my.msn.com instead of Bing
// @include     http://my.msn.com/
// @include     http://www.msn.com/*
// @include     http://*.msn.com/*
// @grant       none
// ==/UserScript==

if (location.href.match(/msn.com\/*/)){
	var searchbox_img = document.getElementById("web");
	searchbox_img.src ="http://findicons.com/files/icons/2336/wpzoom_social_networking_icon/48/google.png";
	
	var searchbox = document.getElementById("srchfrm");
	searchbox.action="http://www.google.com/search?hl=en&safe=off&noj=1&output=search&sclient=psy-ab&q=";
	searchbox = document.getElementById("lssrchfrm");
	searchbox.action="http://www.google.com/search?hl=en&safe=off&noj=1&output=search&sclient=psy-ab&q=";
	searchbox = document.getElementById("footersrchfrm");
	searchbox.action="http://www.google.com/search?hl=en&safe=off&noj=1&output=search&sclient=psy-ab&q=";
	
}