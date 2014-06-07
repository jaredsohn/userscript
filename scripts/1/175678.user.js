// ==UserScript==
	 
// @name          Webmonkey's Hello World
 
// @namespace     http://www.webmonkey.com
 
// @description   A basic example of Greasemonkey that causes an alert at each page load.
	 
// @include       *
	 
// ==/UserScript==
  
var elements = document.getElementsByTagName("a");

console.log(elements);