// ==UserScript==
// @name WinfutureTopnewskiller
// @namespace winfuture
// @include http://winfuture.de/*
// @include http://www.winfuture.de/*
// @exclude http://winfuture.de/news*
// @exclude http://www.winfuture.de/news*
// ==/UserScript==


var allHTMLTags = new Array();

//Alle Elemente auflisten
var allHTMLTags=document.getElementsByTagName("*");

//um sie dann zu durchsuchen
for (i=0; i<allHTMLTags.length; i++) {

//Nach diesem Klassennamen. Der umrahmt die Top-News
if (allHTMLTags[i].className=="content_wrap") {
//unsichtbar machen

allHTMLTags[i].style.display="none";

}

}