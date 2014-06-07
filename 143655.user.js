// ==UserScript==
// @name          Jumla Old Logo
// @namespace     Jumla
// @description   Use the old logo, instead of the new.
// @include       *craftedmovie.com/*
// @version 	  1.0
// ==/UserScript==

if(document.body.innerHTML.indexOf("logo.png") != -1) {
	document.body.innerHTML= document.body.innerHTML.replace("logo.png","logo_old.png");
}