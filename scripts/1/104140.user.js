// ==UserScript==
// @name           one word highlighter
// @namespace      Second
// ==/UserScript==



	var b = document.body;
	var word = 'word';
	b.innerHTML = b.innerHTML.replace(new RegExp(word,"g"), '<blink><span style="color:red;background-color:white;font-weight:bold;">'+word+'</span></blink>');


	

