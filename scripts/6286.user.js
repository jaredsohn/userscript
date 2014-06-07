// ==UserScript==
// @name           Display elements
// @namespace      http://mywebsite.com/myscripts
// @description    Display elements in document
// @include        *
// ==/UserScript==

var window.allElements, thisElement;
allElements = document.getElementsByTagName('html');
for(var i = 0; i < allElements.length; i++){
	thisElement = allElements[i];
}
alert(window.allElements[1]);