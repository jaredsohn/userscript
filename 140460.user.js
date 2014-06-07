// ==UserScript==
// @name           herkes turuncu
// @namespace      http://avare.be
// @include        http://avare.be/*
// @exclude        http://avare.be/sozluk.php*
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
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		Herkesturuncu();
	}
}
function Herkesturuncu() {
	$("a[title='kimdir bu dalyarak']").attr('style', 'color: #F60');
        $("font[color='red']").attr('style', 'color: #F60');
}
