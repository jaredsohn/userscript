// ==UserScript==
// @name Z8Games Forum - Resize Images
// @namespace http://modhub.org
// @description Resizes all the images on Z8Games to within the thread boundaries.
// @include http://forum.z8games.com/showthread.php*
// @exclude 
// ==/UserScript==

var z = document.getElementsByTagName('img');
for(i=0;i<z.length;i++) {
if(z[i].width >= 800){
	z[i].width = 800;
	}
}
