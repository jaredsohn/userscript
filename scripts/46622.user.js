// ==UserScript==
// @name		Test
// @namespace	http://no.name.space/
// @description	Just for test
// @include	http://pl*.plemiona.pl/*

// ==/UserScript==

var fset = document.getElementsByTagName('frameset');
if(fset && fset.length > 0){
fset[0].style.display = 'none';
fset[0].cols = "*,0";
}