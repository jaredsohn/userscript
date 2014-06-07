//
// 29.01.2010
//

// ==UserScript==
// @name  	  Яндекс.Фотки прямые ссылки на ориг. изображение
// @description   Открывает оригинальное изображение вместо страницы с комментариями (может стоит оставить, если есть комментарии?)
// @include   	  *fotki.yandex.ru/*

// ==/UserScript==


if (location.href.match('/view/')) { 

p = new String(document.links.item(152));
if (p.match(RegExp('http://img-fotki.yandex.ru/get/'))) {top.location.href=document.links.item(152)}


//If you need see a comments, in case when they have, comment this part of script.
	len=document.links.length;
	 for (i=0; i<=len-1; i=i+1) {
	 p = new String(document.links.item(i));
	   if (p.match(RegExp('http://img-fotki.yandex.ru/get/'))) {top.location.href=document.links.item(i)}
	 } 
//--------------------------------------------------------------------------------

}