// "alt2title" user script
// version 1.00
// 2008-05-06
// Copyright (c) 2008, Matt Sephton <matt.sephton@gmail.com>
//
// --------------------------------------------------------------------
//
// This is a user script that requires Greasemonkey (Firefox on Mac, PC 
// or Linux), GreaseKit (Safari on Mac) or Turnabout Advanced (IE on
// on PC). After installing one of the above programs, restart your 
// browser and come back here.
// 
// In Firefox or Safari, clicking on the ECC script of your choice will 
// prompt you to "Install User Script", then click "Install" to do so.
// In Internet Explorer, right click on the ECC script of your choice 
// and choose "Install Script".
// 
// To uninstall, follow the instructions given in Greasemonkey, 
// GreaseKit or Turnabout Advanced.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          alt2title
// @namespace     http://www.gingerbeardman.com/alt2title/
// @description   Move alt tag text to title tag
// @include       *
// ==/UserScript==


for (var i=0; i < document.images.length; i++) {
	if (document.images[i].alt != '' && !document.images[i].title) {
		document.images[i].title = document.images[i].alt;
		document.images[i].alt = '';
	}
} 
