// ==UserScript==
// @id             www.youtube.com-0d34eb03-8e25-4737-8feb-08075711e985@scriptish
// @name           youtube features
// @version        1.0.0
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/486456
// @author         Black_Sun
// @description    Данный скрипт добавляет небольшие кнопки под подписками в левом столбце, фид и видео для быстрого доступа к соответствующим разделам
// @include        https://www.youtube.com/*
// @require https://raw.github.com/Black-Sunlight/lib-files/master/jquery.js
// @run-at         document-end
// ==/UserScript==

$(function(){

	var feed=$('#guide-channels').find('a.guide-item')
	feed.each(function(i){
		if($(this).attr('href').search(/\/videos/ig)==-1){
		var lnk=$(this).attr('href'),name=$(this).text(),w=($(this).width()-6),style='width:'+w/2+'px;text-align:center;font:11px Arial;margin-left:2.2px;';
		
		feed.eq(i).after('<a href="'+lnk+'/feed" style="'+style+'" class="yt-uix-button yt-uix-sessionlink yt-uix-button-epic-nav-item yt-uix-button-size-default" data-sessionlink="ei=fJJkU7rgMqfuwwONl4DgBw"><span class="yt-uix-button-content">Фид </span></a><a href="'+lnk+'/videos" style="'+style+'" class="yt-uix-button yt-uix-sessionlink yt-uix-button-epic-nav-item yt-uix-button-size-default" data-sessionlink="ei=fJJkU7rgMqfuwwONl4DgBw"><span class="yt-uix-button-content">Видео</span></a>');
		}
	});	
	
	
	});	