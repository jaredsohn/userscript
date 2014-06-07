// ==UserScript==
// @name            jebeno doniranje
// @namespace       www.erepublik.com
// @author          glupost najveca
// @description     Mrsh bre
// @version         3.14
// @include         http://economy.erepublik.com/en/citizen/donate/*
// ==/UserScript==

var items3 = document.getElementById('items3').getElementsByClassName('blueborder mbot2')[0];
var items3HTML = items3.getElementsByTagName('ul')[0].innerHTML;
var donate3 = document.getElementById('items3').getElementsByTagName('form')[0];
donate3.getElementsByClassName('blueborder')[0].getElementsByTagName('ul')[0].innerHTML = items3HTML;
items3.getElementsByTagName('ul')[0].innerHTML="";
