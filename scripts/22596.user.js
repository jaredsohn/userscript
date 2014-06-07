function slimerdown(){ // disapear all our unwanted friends
	document.getElementById('selectors-box').style.display = 'none';
	document.getElementById('add-box').style.display = 'none';
	document.getElementById('gbar').style.display = 'none';
	document.getElementById('logo-container').style.display = 'none';
	document.getElementById('global-info').style.display = 'none';
	document.getElementById('search').style.display = 'none';
}

GM_registerMenuCommand('Slimerdown',slimerdown);

// Script by defrex
// email: defrex0@gmail.com
// web: 

// ==UserScript==
// @name          Google Reader Slimmer
// @namespace     http://defrex.com
// @description   Removes superfluois ui bits form Google Reader
// @include       http*://www.google.com/reader/view/*
// ==/UserScript==
