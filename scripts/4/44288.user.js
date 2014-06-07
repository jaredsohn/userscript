// ==UserScript==
// @name          Google PowNed
// @description   GeenStijl.nl
// @include       http://www.google.*
// @include       http://google.*
// ==/UserScript==

var allElements, thisElement;
allElements = document.getElementsByTagName("img");
for (var i = 0; i < allElements.length; i++) {
	thisElement = allElements[i];

	if(thisElement.src.indexOf("logo.gif") == -1) {
		continue;
	}

	thisElement.src = "http://img3.imageshack.us/img3/755/googlepowned.gif";
}