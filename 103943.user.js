// ==UserScript==
// @id             depositfiles_waiter
// @name           depositfiles_waiter
// @namespace      http://userscripts.org/scripts/show/103743
// @description    В коде скрипта есть параметр autodownload изменяя его на значение true или false влияйте на то автоскачивание. По умолчанию автоскачивание ВКЛючено.
// @version        2.3
// @history        2.3 Добавлена опция индикации работы скрипта, когда вы думаете что скрипт не работает.
// @history        2.2 Убрано предупреждение о начале запроса, так же уменьшено время ожидания в конце, если не будет работать автоскачивание напишите мне об этом.
// @history        2.1 Исправлены некоторые переменные.
// @history        2.0 Добавлена опция автоматического скачивания после появления кнопки, добавлено описание, изменён namespace скрипта.
// @history        1.0 Релиз.
// @include        http://depositfiles.com/*/files/*
// @updateURL	https://userscripts.org/scripts/source/103743.meta.js
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js?ver=1.6.1
// ==/UserScript==

var autodownload=true; //Режим автоскачивания, true - включить, false - выключить.
var indication=true; //Индикация работы скрипта, true - включить, false - выключить.

$('document').ready(function(){
if(indication){$('.chousetype').ajaxStart(function(){$(this).html('<center><span style="font-size:14px;color:green">Идёт запрос, пожалуйста подождите,<br> скорость запроса зависит от скорости вашего интернета</span></center>');})}
$.ajax({
	type: "POST",
	url:location.href,
	data:"gateway_result=1",
	dataType: "html",
	headers:{'Content-Type':'application/x-www-form-urlencoded'},
	success:function(data){
	var lnk=$(data).text().match(/\/get_file.php\?fid=[a-z0-9]{1,}/ig);
	var time=$('#download_waiter_remain',data).text();
	var timer='';
	var hos=location.href.split('/');
	var site="http://"+hos[2]+"/"+hos[3];
	timer=setInterval(function(){$('.chousetype').html('<center><span style="font-size:14px;">Надо подождать '+time+' сек.</span></center>');if(time<1){clearInterval(timer);
$('.chousetype').load(site+lnk).wrap("<center id='link'></center>");if(autodownload){setTimeout(function(){location.href=$('#link').find('form').attr('action');},1000)}}time--;},1000);
}
});
});