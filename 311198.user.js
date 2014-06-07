// ==UserScript==
// @name		Dilema
// @namespace		http://userscripts.org/users/65373
// @description		Hides clutter on dilema
// @version		2.0
// @include	        http://*dilemaveche.ro/*
// ==/UserScript==

function class_size(theClass, much) {
	var allPageTags=document.getElementsByTagName("*");
	for (i=0; i<allPageTags.length; i++) {
		if (allPageTags[i].className==theClass) {
			allPageTags[i].style.width=much;
		}
	}
}

function block_class(theClass, much) {
	var allPageTags=document.getElementsByTagName("*");
	for (i=0; i<allPageTags.length; i++) {
		if (allPageTags[i].className==theClass) {
			allPageTags[i].style.display = "none";
		}
	}
}

function block_id(theId, much) {
	var div=document.getElementById(theId);
	div.style.display = "none";
}

function posit(theClass, position_left, position_top) {
	var allPageTags=document.getElementsByTagName("*");
	for (i=0; i<allPageTags.length; i++) {
		if (allPageTags[i].className==theClass) {
			allPageTags[i].style.position = 'relative';
			allPageTags[i].style.left = position_left +'px';
			allPageTags[i].style.top = position_top +'px';
		}
	}
}

block_id('content_right');
var center = document.getElementById('content_left');
center.style.width = '100%';
class_size('c_left_column', "80%");