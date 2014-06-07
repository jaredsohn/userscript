// ==UserScript==
// @name           HBO 'new:' disabler
// @namespace      HBO
// @description    Removes the bolded 'new:' on new posts, to preserve alignment.
// @include        *.bungie.org/haloforum/*
// ==/UserScript==

var headElement, newStyleElement;

headElement = document.getElementsByTagName('head')[0];
newStyleElement = document.createElement('style');
newStyleElement.type = 'text/css';
newStyleElement.innerHTML = 'td.g>b { display: none; }';
headElement.appendChild(newStyleElement);