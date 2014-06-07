// ==UserScript==
// @name           Stop iPhone clankom
// @namespace      http://www.sunko.info/blog
// @description    prepise vsetky iPhone linky na vybranom webe
// @include        http://www.mobilmania.sk/*
// ==/UserScript==





var linky = document.getElementsByTagName('a');
for(var n=linky.length-1;n>=0;n--){
var href = linky[n].href.toLowerCase();
var text = linky[n].text.toLowerCase();
if (href.indexOf('iphon') != -1 || text.indexOf('iphon') != -1) {
linky[n].title = 'Povodny odkaz: '+ linky[n].text  ;
linky[n].href = 'http://www.sunko.info/blog/iphone-odstranovac';
linky[n].innerHTML = "Odkaz bol na Vasu ziadost odstraneny";
}
}