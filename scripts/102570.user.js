// ==UserScript==
// @name           BT Image Resizer
// @namespace      Clammo
// @description    Resizes huge pics on Barton Town
// @include        http://*gaiaonline.com/forum/barton-town/*
// ==/UserScript==

var z = document.getElementsByTagName('img');
for(i=0;i<z.length;i++) {
if(z[i].width >= screen.width*0.25){
	z[i].width = screen.width*0.25;
	}
if(z[i].height >= screen.height*0.5){
	z[i].height = screen.height*0.5;
	}
}