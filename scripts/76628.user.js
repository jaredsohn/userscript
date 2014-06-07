// ==UserScript==
// @name SalvaPD
// @include http://www.partitodemocratico.it/*
// ==/UserScript==

var data = document.getElementsByClassName('boxright_infodoc').item(0).innerHTML;

var tit = document.getElementsByTagName('h1').item(0).innerHTML;

var art = document.getElementsByClassName('text_doc').item(0).innerHTML;

document.getElementsByTagName('html').item(0).innerHTML = data+'<br /><br />'+tit+'<br /><br />'+art;