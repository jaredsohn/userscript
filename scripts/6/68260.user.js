// ==UserScript==

// @name           Expreszo-logo

// @namespace      http://userscripts.org/users/72899

// @include        http://expreszo.nl/forum/*

// @include        http://www.expreszo.nl/forum/*

// @description    Glitters! (copyright Soraya 2.0)
// ==/UserScript==



var imgs = document.getElementsByTagName('img');

for ( var i in imgs )
{
	if ( !imgs[i].src.match("expreszologo.gif") ) continue;

	imgs[i].src = "http://i304.photobucket.com/albums/nn176/boudewijn83/logo-soraya.gif";

	imgs[i].style.width  = "247px";
	imgs[i].style.height = "60px";
}