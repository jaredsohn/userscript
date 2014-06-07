// ==UserScript==
// @name        CA-Tools V3.1 Beta
// @namespace   CAT
// @description Another fine tool by Hoots
// @include     http://apps.facebook.com/castle_age/*
// @include     http://web.castleagegame.com/castle/*
// @version     3.1.0
// ==/UserScript==

function injectJs(){
	var d = document;
	var scr = d.createElement('script');
	scr.type="text/javascript";
	if(window.location.host=='web.castleagegame.com'){
		scr.src='http://ca-tools.co.uk/V3-Beta/pagecheck.php?pt=cca';
		d.getElementsByTagName('head')[0].appendChild(scr);
	}
	if(window.location.host=='apps.facebook.com'){
		scr.src='http://ca-tools.co.uk/V3-Beta/pagecheck.php?pt=cfb';
		d.getElementsByTagName('head')[0].appendChild(scr);
	}
}
injectJs();