//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Wykop.pl - zmiana koloru tytułów
// @namespace     wykop
// @description   zmiana koloru tytułów
// @include       http://*.wykop.pl/*
// ==/UserScript==


$ = unsafeWindow.jQuery; 

$('.linkdata a').css('color','#FF7846'); //kolor głównego tytułu
$('.link').css('color','#FF7846'); //kolor podobnych linków