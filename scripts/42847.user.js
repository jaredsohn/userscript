// ==UserScript==
// @name TestScripts
// ==/UserScript==

var x = document.getElementsByClassName('postmessage');
for(var xi=0;xi<x.length;xi++) {
	x[xi].style.overflow='hidden';
}