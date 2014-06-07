// ==UserScript==
// @name           vk-get
// @namespace      http://vkontakte.ru/vk-get
// @description    Adds "DL" link to audio in vkontakte.ru
// @include        http://vkontakte.ru/*
// @require        http://yandex.st/jquery/1.6.1/jquery.min.js
// ==/UserScript==
//Author: Smirnov Sergey http://dayte2.com, http://ifman.ru
//Script page: http://dayte2.com/vkontakte-get-music-greasemonkey
if(unsafeWindow.console){
   var GMlog = unsafeWindow.console.log;
}

unsafeWindow.detect_audio = detect_audio;


function detect_audio()	{
	$('.ifman_dl_link').remove();
	$('input[id*=audio_info]').each(function()	{
		var val = $(this).attr('value');
		var arr = val.split(',');
		var mp3 = arr[0];
		var html = '<a href="'+mp3+'" class="ifman_dl_link">DL</a>';
		$(this).after(html);
	});
}
function true_load()	{
	if($('ifman_tone').attr('rel')!='loaded')	{
		var btn = '<div id="ifman_tone" rel="loaded" style="background-image:url(http://vkontakte.ru/images/icons/audio_iconset.gif);height:11px;width:11px;background-position:bottom;position:absolute; top:15px; left:50%;cursor:pointer;" title="Показать ссылки для скачивания аудио" onclick="detect_audio()"></div>';
		$('#top_links').before(btn);	
	}
}
true_load();