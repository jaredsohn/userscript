// ==UserScript==
// @name           Billy Mays
// @namespace      http://whatsonyourdesktop.com/
// @description    Tweak every web page to feel like a Billy Mays infomercial. RIP Billy.
// @include        *
// ==/UserScript==

window.addEventListener("load", function(e) 
{
	var objects = document.getElementsByTagName("*");
	for (var i = 0; i < objects.length; i++) {
	  objects[i].style.textTransform = 'uppercase'
	}
  
}, false);

