// ==UserScript==
// @name           Link box killer
// @namespace      
// @description    Removes the annoying grey boxes in all pages
// @include        *// ==/UserScript==

var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
style.innerHTML = 'a:focus {outline: none ! important; }';
head.appendChild(style);