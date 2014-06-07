// ==UserScript==
// @name          Google +you remover
// @namespace     Insert Signature Here?
// @description   This removes the silly +you sign >:D
// @include       *.google.*
// ==/UserScript==

var annoying = document.getElementById('gb_119');
if (annoying){
	annoying.parentNode.removeChild(annoying);
}

var arrow = document.getElementById('hplogoa');
if (arrow){
	arrow.parentNode.removeChild(arrow);
}