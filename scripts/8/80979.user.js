// ==UserScript==
// @name           fixconcur
// @namespace      concur
// @description    make concur not suck on mac, specifically allow receipt attachment
// @include        http://myprod.concureworkplace.com/ewp/Reports/XmsViewReceipt.asp
// @include        https://myprod.concureworkplace.com/ewp/Reports/XmsViewReceipt.asp
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
function letsJQuery() {
	var hax = function() {
		alert("Concur blows, but here is a hack from alan. Click cancel at the next dialog, then click Attach Receipt Images. Feel free to send money to alan@yelp.com");
		window.location = 'https://myprod.concureworkplace.com/ewp/Reports/XmsViewReceiptBody.asp?t=63817'; 
	}
	setTimeout(hax, 400);
}