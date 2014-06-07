// ==UserScript==
// @name           wijbdoaypd
// @namespace      http://userscripts.org/users/101059
// @description    What is JB doing on all your pages??
// @include        *
// ==/UserScript==

var images, width, height;

images=document.getElementsByTagName("img");
for (var i=0; i<images.length; i++) {
 width=parseFloat(images[i].width);
 height=parseFloat(images[i].height);
 images[i].src="http://www.islanddefjam.com/images/local/500/5b52f029-1cbb-49e2-afce-f8b70f813303.jpg";
 images[i].width=width;
 images[i].height=height;
}
