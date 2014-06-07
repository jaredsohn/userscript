// ==UserScript==
// @name           Usun opis dodatkowy w Moto.Gratka.pl
// @namespace      pl.gratka.moto
// @description    Usuwa opis dodatkowy na karcie ogłoszenia
// @include        http://moto.gratka.pl/tresc/*
// ==/UserScript==

n = document.getElementsByTagName('h3')[1].parentNode;

n.removeChild(n.childNodes[5]);
n.removeChild(n.childNodes[5]);
n.removeChild(n.childNodes[5]);