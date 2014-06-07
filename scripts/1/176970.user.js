// ==UserScript==
// @name       ZgłośBelka
// @description Podmienia "gry" na "Zgłoszenia" przekierowywuje na strone z listą zgłoszonych przez nas treści. 
// @namespace  http://www.wykop.pl/ludzie/SebusPL/
// @version    1.0
// @include        http://wykop.pl/*
// @include        http://*.wykop.pl/*
// @copyright  2013
// ==/UserScript==

document.getElementById('header-con').getElementsByClassName('tab')[5].innerHTML = 'Zgłoszenia'
document.getElementById('header-con').getElementsByClassName('tab')[5].href = 'http://www.wykop.pl/naruszenia/moje/';
document.getElementById('header-con').getElementsByClassName('tab')[5].title="Twoje zgłoszenia"