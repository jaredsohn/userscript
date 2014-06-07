// ==UserScript==
// @name           DW Logo Changer by Qupiack
// @namespace      qupiack@wp.pl
// @include        http://darkwarez.pl/forum/*
// @include        http://www.darkwarez.pl/forum/*
// ==/UserScript==
var logo = document.getElementsByTagName("img")[0];
logo.src = "http://i44.tinypic.com/2qmznvb.png"; //link
logo.width = "840"; //szerokosc bez jednostki wielkosci
logo.height = "120"; //wysokosc jak wyzej