// ==UserScript==
// @name SalvaPD3
// @include http://www.partitodemocratico.it/*
// ==/UserScript==

var tritit = document.getElementsByTagName('h1').item(0).innerHTML;

var triart = document.getElementsByClassName('testo').item(0).innerHTML;

document.getElementsByTagName('html').item(0).innerHTML = tritit+'<br /><br />'+triart;