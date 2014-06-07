// ==UserScript==
// @name           Add ISBN To Library
// @namespace      http://www.dp.cx/userscripts
// @include        http://www.librarything.com/work/*
// ==/UserScript==

var new_href = location.protocol + "//" + location.host
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

checkjQueryLoaded();

function checkjQueryLoaded() {
	if(typeof unsafeWindow.jQuery == 'undefined') { GM_log("jQuery not loaded"); window.setTimeout(checkjQueryLoaded,100); }
	else { $ = unsafeWindow.jQuery; GM_log("jQuery loaded"); window.setTimeout(handler, 1000); }
}

function handler() {
	var isbn = $("a[href*=amazon]").text().replace(/^ISBN /, "").replace(/Amazon.com/, "")

	GM_log(isbn);

	$(".workSection a[href*=add]").click(function() {
		location.href = new_href + '/addbooks?plusbook=' + isbn;
		return false;
	});
}
