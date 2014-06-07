// ==UserScript==
// @name          Comet7
// @namespace     Comet 7 Corrector
// @description	  Adds strip names to Comet 7 pages
// @include       http://www.comet7.com/*
// @include       http://comet7.com/*
// ==/UserScript==

(function() {
var temp = window.location.href.split("/");
var domain = temp[3]; 
var page = domain.substring(0,16);
var comet = "Comet 7 - ";
var i=document.getElementsByTagName('img');
for (var j=15; j<18; j++) {
if (page == "archive_page.php")
{
	if (''==i[j].title && ''!=i[j].alt) document.title=comet + i[17].alt;
} else if (page == "" || page == "index.php")
{
	if (''==i[j].title && ''!=i[j].alt) document.title=comet + i[15].alt;
} else {
}
}})();