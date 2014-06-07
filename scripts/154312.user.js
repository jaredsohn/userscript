// ==UserScript==
// @name drfl
// @namespace shmidtsergey.ru
// @description drfl
// @author Sergey Shmidt
// @include http://dribbble.com/designers/players*
// @exclude 
// ==/UserScript==

//Подключаем jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.8.0.min.js';
GM_JQ.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);


function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 2000); }
}
GM_wait();



function letsJQuery(){

	$(".action.follow").click();

	window.setTimeout(function(){
		$(".next_page").click();
	}, 5000);
}