// ==UserScript==
// @name		scrnshots sucks
// @namespace		http://pecet.jogger.pl
// @description		Redirects the viewpage of scrnshots to image itself. 
// @include		http://www.scrnshots.com/users/*/screenshots/*
// ==/UserScript==

var el = document.getElementsByClassName('screenshot_full');
window.location.replace(el[0].parentNode.href);
