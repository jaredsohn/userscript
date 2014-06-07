// ==UserScript==
// @name Process all images on beardofevil.com
// @namespace Paul Hunkin
// @include *
// ==/UserScript==

var baseurl = "http://beardofevil.com/b.py?url=";
var a = "-1";

while (a<document.images.length) {
	a++;
	if(document.images[a].src.indexOf(".jpg") > 0)

		document.images[a].src = baseurl + escape(document.images[a].src);

}