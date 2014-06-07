// ==UserScript==
// @name        chatlogs.jabber.ru cleaner
// @description Очищает логи chatlogs.jabber.ru от "входов" и "выходов"
// @version     1.0
// @include     http://chatlogs.jabber.ru/*
// @grant       none
// ==/UserScript==

var links = document.getElementsByTagName("font");
for (var i=0; i<links.length; i++) {
 links[i].innerHTML = links[i].innerHTML.replace(/^.*в(о|ы)ш(е|ё)л\(а\) (в|из) комнат(у|ы).*$/i,"");
}