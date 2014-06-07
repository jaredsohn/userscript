// ==UserScript==
// @name           przewijanie miniaturek
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==

var u = unsafeWindow;
var $ = u.$;

$("#morePhotos").bind("DOMMouseScroll", scroll, false);

function scroll(e){
	e.preventDefault();
	if(e.detail > 0){
		u.photosMoreNext();
	}else{
		u.photosMoreBack();
	}
}