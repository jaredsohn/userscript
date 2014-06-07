
// ==UserScript==
// @name           Počítadlo poďakovaní www.WarXtreme.com
// @namespace      http://userscripts.org/scripts/show/157261
// @version        Final
// @author         Ja_som
// @description    Zobrazuje počet poďakovaní na konci zoznamu poďakovaní.
// @match          http://www.WarXtreme.com/*
// @include        http://www.WarXtreme.com/*
// ==/UserScript==

var elems = document.getElementsByClassName('gen');
for(var i = 0; i < elems.length; i++)
{
    var numberOfThanks = elems[i].getElementsByTagName('a').length;
    elems[i].innerHTML += '(' + numberOfThanks + ')';
    
}