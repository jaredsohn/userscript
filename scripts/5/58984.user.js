// ==UserScript==
// @name           People who says capture are idiots
// @namespace      http://www.yo/.
// @include        http://www.flickr.com/photos/*
// ==/UserScript==

var outer = document.getElementById("DiscussPhoto");
var els = outer.getElementsByTagName("p");

for (i=0;i<els.length;i++) {
	//alert("so far so goot");
	if (els[i].innerHTML.search("capture")>-1) els[i].innerHTML="I am an idiot.";
}
