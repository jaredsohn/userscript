// ==UserScript==
// @name          Bugzilla
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       http://is.eranet.pl/*
// ==/UserScript==


var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('td');
for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
	if( thisTextarea.innerHTML.indexOf('kwierzbicki') >= 0 ) {
alert{'aaaaaasasasasa');
		thisTextarea.style.color = 'red';
		thisTextarea.style.font-weight = 'bold';
	}
}