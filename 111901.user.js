// ==UserScript==
// @name           btc flags
// @namespace      http://userscripts.org/users/121260
// @include        https://intersango.com/*
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
	$("img[src='/img/flags/small/cur_BTC.png']").attr("src", "http://i.imgur.com/3XLDI.png");
	$("img[src='/img/flags/tiny/cur_BTC.png']").attr("src", "http://i.imgur.com/34ofn.png");
	$("img[src='/img/flags/medium/cur_BTC.png']").attr("src", "http://i.imgur.com/AG98S.png");
	$("img[src='/img/flags/big/cur_BTC.png']").attr("src", "http://i.imgur.com/7zRt4.png");
}