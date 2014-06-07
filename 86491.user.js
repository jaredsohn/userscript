// ==UserScript==
// @name           Tabulator
// @namespace      *
// @description    Tabulator for bitrix
// @include        http://page-flip.com/bitrix/admin/fileman_file_edit.php?*
// ==/UserScript==

//Сonnecting a jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.shmidtsergey.ru/js/jquery.js';
GM_JQ.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

//connecting textarea script for jQuery
var JQ_TB = document.createElement('script');
JQ_TB.src = 'http://www.shmidtsergey.ru/js/textarea.js';
JQ_TB.type ='text/javascript';
document.getElementsByTagName('head')[0].appendChild(JQ_TB);

function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; window.setTimeout(letsJQuery, 2000); }
}
GM_wait();

function letsJQuery() { 
	a = $('h1').text();
	$("input[name='save']").val(a);
	var newtimeout = setTimeout(function(){$("textarea").tabby();}, 2000);
	$('body').append('<div style="position:fixed; top:0; right:40px; padding:6px; -moz-border-radius:0 0 8px 8px; font-size:10px; background:rgba(0,0,0,0.5); color:#FFF; cursor:pointer" onclick="$(this).remove();">Tabulator is on!</div>');
	var thisurl = location.href;
	location.href = thisurl+"#tab_edit1"; 
}