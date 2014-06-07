// ==UserScript==
// @name       airliners.net full size images 
// @namespace  http://www.airliners.net
// @version    0.1
// @description  Allows airliners.net's thumbnails to point directly to the full size image. 
// @include      *www.airliners.net/*
// @run-at		document-end
// @copyright  2013+, Joseph
// ==/UserScript==

for (var i = 0; i < document.getElementsByTagName('img').length; i++) {
	if (document.getElementsByTagName('img')[i].alt === "Click here for full size photo!"){
		document.getElementsByTagName('img')[i].parentNode.href = document.getElementsByTagName('img')[i].src.replace('small', 'photos')
	}
};