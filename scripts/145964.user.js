// ==UserScript==
// @name           DW Logo Changer
// @namespace      dwlogochangerx6789@gmail.com
// @include        http://darkwarez.pl/forum/*
// @include        http://www.darkwarez.pl/forum/*
// ==/UserScript==
var logo = document.getElementsByTagName("img")[0];
logo.src = "http://vpx.pl/i/2012/09/02/v1fQB.jpg"; //link
logo.width = "840"; //szerokosc bez jednostki wielkosci
logo.height = "120"; //wysokosc jak wyzej