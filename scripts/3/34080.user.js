// ==UserScript==
// @name           ASCIIMathML.js
// @include        http://groups.google.com/*
// @include        http://sites.google.com/*
// ==/UserScript==
      
var head, newElement;
head = document.getElementsByTagName('head')[0];
if (head) {
script = document.createElement('script');
script.setAttribute('type', "text/javascript");
script.setAttribute('src',  "http://google-as-courseware.googlecode.com/files/ASCIIMathML.js");
head.appendChild(script);}