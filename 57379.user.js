// ==UserScript==
// @name           AntySledzik
// @namespace      http://kubofonista.net/antysledzik
// @description    Usuwa sledzika z Naszej-Klasy
// @include        http://nasza-klasa.pl/
// @include	       http://nasza-klasa.pl/profile/*
// @include        http://www.nasza-klasa.pl/
// @include	       http://www.nasza-klasa.pl/profile/*
// ==/UserScript==

GM_addStyle('#sledzik_box {display:none;} .remove_followee {display:none;} .follow_inactive {display:none;} .add_followee {display:none;}');

var z = document.getElementById('page_menu_znajomi').innerHTML.replace('<a href="/sledzik/follower">','<!--');
//var z1 = z.replace('prezent</a>','prezent</a> <!--'); Nie dziala, czemu?
//var z2 = z1.replace('<a href="/portfel/podaruj','--><a href="/portfel/podaruj'); Nie dziala, czemu?
var zamiana = z.replace('<a href="/gifts/list">','--><a href="/gifts/list">');

document.getElementById('page_menu_znajomi').innerHTML = zamiana;