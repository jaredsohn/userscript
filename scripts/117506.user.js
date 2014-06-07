// ==UserScript==
// @name          xerotic's Remove Header Link
// @namespace     xerotic/removeheaderlinks
// @description   Removes the links under the logo
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 	  1.0
// ==/UserScript==


var divs = document.getElementsByTagName('div');
var element;
var i;
for ( i = 0; i < divs.length; i++ ) {
	element = divs[i];
	if(element.className == 'menu') {
		element.innerHTML = '';
	}
}