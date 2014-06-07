// ----------Специально для лепры ----------------------------------------------
//
// ==UserScript==
// @name Лепрожопки
// @namespace http://kvizo.ru
// @version 0.02
// @source http://kvizo.ru
// @description Этот скрипт сделает вашу жизнь прекрасной
// @include http://leprosorium.ru/*
// @include http://*.leprosorium.ru/*
// ==/UserScript==

function addStyle() {
	
	if(document.createStyleSheet) {
		var rand = Math.random();
		document.createStyleSheet("http://starrow.kvizo.ru/public/style.css?r="+rand);
	} else {

		var fileref=document.createElement("link");
	  	fileref.setAttribute("rel", "stylesheet");
	  	fileref.setAttribute("type", "text/css");
	  	var rand = Math.random();
	  	fileref.setAttribute("href", "http://starrow.kvizo.ru/public/style.css?r="+rand);
	  	document.getElementsByTagName("head")[0].appendChild(fileref)
	}
}
addStyle();