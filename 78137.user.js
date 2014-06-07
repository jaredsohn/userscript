// ==UserScript==
// @name Link Selector
// @namespace shmidtsergey.ru/vk/
// @description Link Selector
// @author Sergey Shmidt
// @include http://vkontakte.ru/board.php?act=topics&id=1012534*
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
	
	window.location = "http://vkontakte.ru/board1012534#order=1";

	var saveTopics = new Array("topic-1012534_8747038", "topic-1012534_1676922", "topic-1012534_9439507", "topic-1012534_5126836", "topic-1012534_1507768", "topic-1012534_1124180");

	window.setTimeout(function(){
		
		var url = $('#rows_content a:first').attr('href');
		
		cangonext = 0;
				
		for (var saveurl in saveTopics){

				currenturl = saveTopics[saveurl];

				if (currenturl == url){
					cangonext = 1;
					break;
				}
		}

		if (cangonext == 0){
			window.location = "http://vkontakte.ru/"+url;
		}
		
	}, 500);

}