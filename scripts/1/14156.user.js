// ==UserScript==
// @name          Neptun Font Formatter
// @description   Shows Neptun with Arial font instead of Times
// @include       https://*/hallgatoi/*.aspx*
// ==/UserScript==

var tags = document.getElementsByTagName("*");
for(var i = 0; i < tags.length; i++) {
	var t = tags[i];
	t.style.fontFamily = "Arial";
}
