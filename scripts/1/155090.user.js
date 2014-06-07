// ==UserScript==
// @name        Mikrotwitter
// @description Zmienia napis "Mikroblog" w "Twitter". Na życzenie @Oskarek89
// @include        http://wykop.pl/*
// @include        http://*.wykop.pl/*
// @author      produktdotestow
// ==/UserScript==

document.getElementById('header-con').getElementsByClassName('tab')[3].innerHTML = 'Twitter';