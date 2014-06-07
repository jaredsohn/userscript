// ==UserScript==
// @name           usuwacz ambrozji
// @namespace      Polska 
// @author         Makciek
// @include	http://s*.ikariam.*/*
// @include	http://s*.*.ikariam.*/*
// @exclude	http://support.ikariam.*/*
// @exclude	http://board.*.ikariam.*/*
// ==/UserScript==

var ambrozja = document.getElementsByTagName('a');

for(i=0;i<ambrozja.length;i++){
if(ambrozja[i]=='http://s1.pl.ikariam.com/index.php?view=premium'){
ambrozja[i].style.background = 'none';
}
}