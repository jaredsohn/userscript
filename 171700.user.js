// ==UserScript==
// @id             www.gigabase.com-33458207-97e5-4b99-afda-14504a4579d9@scriptish
// @name           gigabase auto download page
// @version        1.0
// @history        1.0 Релиз скрипта.
// @namespace      http://userscripts.org/scripts/show/171700
// @author         Black_Sunlight
// @description    Скрипт выводит ссылку на скачивание вместо кнопок. Есть настройка автоскачивания (включена по умолчанию), для выключения см. код скрипта.
// @include        http://www.gigabase.com/getfile/*
// @require	http://code.jquery.com/jquery-latest.min.js
// @run-at         document-end
// ==/UserScript==

var autodownload=true; //Для выключения автоскачивания написать false вместо true; и соответственно наборот для включения.

(function(){
var lnk1=$('.gigaBtn.std').attr('href');
$('#DownloadPage').html('<div id="lnk" style="margin:0 auto;display:block;color:green;font-size:28px;padding:120px 0 50px 0;width:300px">Грузим ссылку</div>');

$.get(lnk1,function(tel){
var lnk2=$('.nothx1',tel).attr('href')
	$.get(lnk2,function(url){
	var lnkfinal=$('a[href*="/dfile/"]',url).closest('.inner').html()
	$('#lnk').html(lnkfinal)
	if(autodownload)location.href=$('a[href*="/dfile/"]',url).attr('href');
})})
})()