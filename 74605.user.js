// ==UserScript==
// @name           Tahomapunch
// @description    Because not all of us use a Mac.
// @include        http://www.facepunch.com/*
// ==/UserScript==

// by a2h

// release 2 - edited to also apply to textareas

var head = document.getElementsByTagName('head')[0];
var elm = window.document.createElement('link');
elm.rel = 'stylesheet';
elm.type = 'text/css';
elm.href = 'data:text/css;charset=utf-8,' + escape('body,textarea{font-family:tahoma}');

head.appendChild(elm);