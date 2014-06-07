// ==UserScript==
// @name           Remove /r/apple picture
// @namespace      test
// @include        http://www.reddit.com/r/apple/*
// ==/UserScript==

var headers = document.getElementsByTagName('h1');

for (i=0; i<headers.length; i++){
	//headers[i].style.visibility = 'hidden';	
	headers[i].parentNode.removeChild(headers[i]);
}