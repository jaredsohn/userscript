// ==UserScript==
// @id             www.dropbox.com-c367001b-a702-46ca-b00d-67e17fba8715@scriptish
// @name           html5 dropbox player
// @version        1.0.0
// @history        1.0.0 Релиз плеера для mp3 и ogg файлов
// @namespace      http://userscripts.org/scripts/show/486467
// @author         Black_Sun
// @description    Добавляет html5 player для mp3 и ogg файлов
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @include        https://www.dropbox.com/s/*
// @run-at         document-end
// ==/UserScript==
$(function(){
var src=$('#default_content_download_button').attr('href'),
fname=$('meta[name="twitter:title"]').attr('content'),
sp=fname.split('.'),
ext=sp[sp.length-1];

switch (ext){
	case "mp3":
	   $('#default-content').append('<audio src="'+src+'" controls="" type="audio/mpeg"></audio>')
	break;
	case "ogg":
	   $('#default-content').append('<audio src="'+src+'" controls="" type="audio/ogg; codecs=vorbis"></audio>')
	break;
	
	default:
	break;
}
});