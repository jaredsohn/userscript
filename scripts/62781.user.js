// ==UserScript==
// @name           Dirty Search
// @author		   SniXx
// @namespace      search.dirty.ru
// @description    Интегрирует дополнительную форму поиска 
// @include        http://search.dirty.ru/*
// ==/UserScript==

var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait,100); 
	} else { 
		$ = unsafeWindow.jQuery; 
		runApp();
	}
}
GM_wait();

function runApp() {
	var $form = $('<form>').css('marginLeft','180px');
	
	$form.attr('action','http://www.google.ru/search').attr('method','get').append(
		$('<input>').attr('type','hidden').attr('name','as_sitesearch').val('dirty.ru')
	).append(
		$('<input>').attr('type','text').attr('name','as_q').attr('id','google-search-qry').css({'fontSize':'14px','width':'96%'})
	).append(
		$('<button>').attr('type','submit').text('Поискать в Google').css({'display':'block','marginTop':'15px'})
	);
	
	$form.insertAfter('#search-submit-container');
}