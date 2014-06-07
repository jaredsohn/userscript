// ==UserScript==
// @name        Numer produktu
// @namespace   http://userscripts.org/users/marcinwadon
// @include     http://userscripts.org/scripts/show/*
// @version     1
// @author      Marcin Wadoń
// ==/UserScript==

var link = location.pathname;

// link_split -> tablica -> rozdzielony link na slash'e
var link_split = link.split('/');

// oczekiwany numer produktu to któryś element z tablicy. w zależności od ilości slash'y. 
// http://magazyn.strona.pl/variant/summary/974360/ -> w tym wypadku będzie to link_split[4], ale nie mam tego jak sprawdzić
var number = link_split[3];

alert("Numer produktu: "+number);
