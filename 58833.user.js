// ==UserScript==
// @name          Huffington Post Safe-Copy
// @version       .1
// @description   Prevents extra crap when you copy text at Huffington Post
// @author        vatara
// @include       http://www.huffingtonpost.com/*
// ==/UserScript==

var doc = document.wrappedJSObject || document;
doc.oncopy = function (e) { 
	var ev = e || window.event;
	//if (ev.preventDefault) ev.preventDefault();
	//else 
		ev.returnValue = false;
	if (ev.stopPropagation)
	ev.stopPropagation();
	return false;
};