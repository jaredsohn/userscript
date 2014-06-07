// ==UserScript==
// @name SalvaPD2
// @include http://www.partitodemocratico.it/*
// ==/UserScript==

var ridata = document.getElementsByTagName('em').item(0).innerHTML;

var ritit = document.getElementsByTagName('h1').item(0).innerHTML;

var riart = document.getElementsByClassName('text_doc').item(0).innerHTML;

document.getElementsByTagName('html').item(0).innerHTML = ridata+'<br /><br />'+ritit+'<br /><br />'+riart;