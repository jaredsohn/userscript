// ==UserScript==
// @name           drugged nowai³ menu
// @namespace      nowai
// @include        http://*.nowai.ru/*
// ==/UserScript==


function getHigh(){
var list = document.getElementsByClassName("boards_list");
if (list) {
    for (i=0;i<2;i++){
    var l = list[i];
    var s=l.innerHTML;
	l.innerHTML = s.replace("<a href=\"http://nowai.ru/f/\" title=\"Флэш\">f</a>","<a href=\"http://nowai.ru/dr/\" title=\"Drugs\">dr</a> | <a href=\"http://nowai.ru/f/\" title=\"Флэш\">f</a>");
	}
}
}

getHigh();