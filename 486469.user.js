// ==UserScript==
// @id             cloud.mail.ru-496090f2-f6e5-4e95-83b9-8dcc472c1038@scriptish
// @name           mail cloud html5 player
// @version        1.0.1
// @history        1.0.1 Увеличено время загрузки до 1,5 секунд
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/486469
// @author         Black_Sun
// @description    Добавляет html5 player для mp3 и ogg 
// @require https://raw.githubusercontent.com/Black-Sunlight/lib-files/master/jquery.js
// @include        https://cloud.mail.ru/*
// @run-at         document-end
// ==/UserScript==

function start(){
var src=$('.viewer__content__title_link').attr('href'),
sp=src.split('.'),
ext=sp[sp.length-1],
st="width:240px;margin-left:-10px;margin-top:10px";

switch (ext){
	case "mp3":
	   $('.viewer__content__toolbar').after('<audio src="'+src+'" controls="" type="audio/mpeg" style="'+st+'"></audio>')
	break;
	case "ogg":
	    $('.viewer__content__toolbar').after('<audio src="'+src+'" controls="" type="audio/ogg; codecs=vorbis" style="'+st+'"></audio>')
	break;
	
	default:
	break;
}

}

setTimeout(function(){start()},1500)