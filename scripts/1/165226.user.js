// ==UserScript==
// @name        ForTXWB
// @namespace   ForTXWB
// @description ForTXWB
// @include     http://t.qq.com/*
// @version     1
// ==/UserScript==
var $;

// Add jQuery
(function(){
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
	hideli();
}
function hideli() {

	$('li').each(function() {
		TheHtml = $(this).html();
		if (/renwuwang_wangzhe|@S_J_B_|方舟子|微博推广/.test(TheHtml)) {
			$(this).hide();
		};
	});
	setTimeout(function() {
		hideli();
	},
	3000);
}