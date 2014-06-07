// ==UserScript==
// @name        Tweakers.net - artikel 'quote' remover
// @namespace   tweakers
// @description Verwijdert de irritante 'sensatie quotes' in artikelen.
// @include     http://tweakers.net/*
// @version     1
// @grant       none
// ==/UserScript==

var els = document.getElementsByClassName('streamer');

for(var i = 0 ; i < els.length; i++)
{
    els[i].style.display = 'none';
}