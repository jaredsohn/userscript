// ==UserScript==
// @name		imp
// @version		0.1
// @description	imptest
// @author		test
// @namespace		test
// @include		http://www.impulse.nu/*
// ==/UserScript==

var cash = document.getElementByTagName('21')[21].innerhtml;

if(cash>1) {
void(document.getElementsByTagName('td')[21].innerHTML='10 000 000 000 kr');}

