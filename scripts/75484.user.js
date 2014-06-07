// ==UserScript==
// @name twfl
// @namespace shmidtsergey.ru
// @description twfl
// @author Sergey Shmidt
// @include http://twitter.com/*/followers*
// @include https://twitter.com/*/followers*
// @exclude 
// ==/UserScript==

//Подключаем jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.5.1.min.js';
GM_JQ.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 2000); }
}
GM_wait();



function letsJQuery(){

	$(".follow-action .btn").click();

	window.setTimeout(function(){
		url = $("#pagination a:first").attr('href');
		window.location.href='http://twitter.com'+url;
	}, 5000);
}