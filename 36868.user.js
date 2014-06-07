// ==UserScript==
// @name           Leprosorium.ru for free
// @namespace      vnizzz 18787
// @description    Прячет элементы интерфейса, которые появились 12.11.2008
// @include        http://leprosorium.ru/*
// @include        http://www.leprosorium.ru/*
// ==/UserScript==


var fraudid = document.getElementById("fraud-menu");
var domunrid = document.getElementById("domains_unread");
var inbid = document.getElementById("inbox");

fraudid.parentNode.removeChild(fraudid);
domunrid.parentNode.removeChild(domunrid);

var inbinnerHTML = inbid.innerHTML;
var inbinnerHTMLlength = inbinnerHTML.length;
var newinbinnerHTML = "";


for (var i=0; i<inbinnerHTMLlength-1; i++) {

newinbinnerHTML+=inbinnerHTML[i];

}

inbid.innerHTML=newinbinnerHTML;