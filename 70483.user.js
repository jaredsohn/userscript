// ==UserScript==
// @name           vkontakte music download
// @namespace      http://vkontakte.ru
// @description    mp3 music download using vk js lib
// @include        http://vkontakte.ru/audio.php*
// @include        http://vkontakte.ru/gsearch.php?section=audio*
// @include        http://vk.com/audio.php*
// @include        http://vk.com/gsearch.php?section=audio*
// ==/UserScript==

var __node = ge(document);
var __mp3 = geByClass('playimg', __node);
var __title = geByClass('audioTitle', __node);
var __style = (document.location.toString().match('gsearch')) ? '45px' : '55px';
var __ii = 0;

each(__mp3, function(){
	
	var __ml = ''+this.onclick+'';
	var __mp3link = __ml.split("'")[1];
	var __mp3name = __title[__ii].innerText;
		
	var __save = document.createElement('a');
	__save.style.float = 'right';
	__save.style.margin = '0 5px 0 1px'
	__save.innerHTML = '<a href="'+__mp3link+'" title="'+__mp3name+'"><img src="http://i49.tinypic.com/2eav41f.gif" /></a>';
    
	__title[__ii].style.width = '290px';
    
	this.parentNode.appendChild(__save)
	this.parentNode.style.width = __style;
    
	__ii++;
});