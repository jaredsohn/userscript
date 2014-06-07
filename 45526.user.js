// ==UserScript==
// @name           Facepunch small HD
// @namespace      FP small HD
// @description    Makes Facepunch HD video's in smaller
// @include        http://www.facepunch.com/*
// ==/UserScript==

/*put here size multiplier
recommend for 
1280x1024= 0.8
1024x768  = 0.6
1440x900  = 0.9
just try it out
*/
var multip = 0.8;   


var nwidth = 1280*multip;
var nheight = (25+(720*multip));

var z = document.getElementsByTagName('embed');
for(i=0;i<z.length;i++) {
if(z[i].width == 1280){
	z[i].width = nwidth;
	}
}
for(i=0;i<z.length;i++) {
if(z[i].height == 720){
	z[i].height = nheight;
	}
	}
