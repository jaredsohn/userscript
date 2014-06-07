// ==UserScript==
// @name Theme Deletor
// @namespace shmidtsergey.ru/vk/
// @description Theme Deletor
// @author Sergey Shmidt
// @include http://vkontakte.ru/topic-*
// @exclude 
// ==/UserScript==

//Подключаем jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.4.2.min.js';
GM_JQ.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 2000); }
}
GM_wait();

function str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
}


function letsJQuery() {
	
	$(".topicOption a:last-child").attr('onclick', 'show_delete_topic();').attr('href', '#').click();

	window.setTimeout(function(){

		$('#ok_button').attr('onclick', 'delete_topic();').attr('href', '#').click();

		window.location = "http://vkontakte.ru/board1012534#order=1";

	}, 300);

}

