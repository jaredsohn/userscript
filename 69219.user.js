// ==UserScript==
// @name juick.tagseparateline
// @description Пост начинается с новой строки, а не сразу за тэгами(см. #548532)
// @namespace http://juick.com
// @include http://juick.com/*
// ==/UserScript==

var msg = document.querySelector("div.messr");

if(msg){
	var tags = msg.firstChild;
	
	msg.insertBefore(document.createElement("br"), tags.nextSibling); //insertAfter
}