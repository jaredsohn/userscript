// ==UserScript==
// @name Przyciski zmiany strony w przegl�dzie walk
// @description Dodaje przyciski zmiany strony w przegladzie ludzi do zaatakowania (wersja dla uzytkownikow Menelgame menu v.1.3.3)
// @include http://*menelgame.pl/highscore/range/*
// ==/UserScript==
pages = 20;

startpos = window.location.href.search("max_points");
points = window.location.href.substr(startpos, 40);

pages += 1;

var loop = 1;
while(loop < pages){
document.getElementsByTagName('div')[22].innerHTML += '<li><a href="/highscore/range/'+loop+'/?'+points+'">'+loop+'</a></li>';
loop += 1;
}
