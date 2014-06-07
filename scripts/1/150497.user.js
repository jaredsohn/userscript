// ==UserScript==
// @name           CellarDoor Demo Script
// @namespace      Damien
// @description    Invalid at the moment.
// ==/UserScript==
var elmNewContent = document.createElement('a');
	elmNewContent.href = 'http://www.example.com/';
	elmNewContent.appendChild(document.createTextNode('click here'));
	var elmFoo = document.getElementById('foo');
	elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);

