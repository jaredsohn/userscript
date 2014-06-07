// ==UserScript==
// @name         Quake Live Share Button Hider
// @version      1.01
// @namespace    http://userscripts.org/scripts/show/76864
// @description  Removes the "addthis.com" Share button from the Quake Live website.
// @author       wn
// @include      http://*.quakelive.com/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0], style = document.createElement('style'), css = '.addthis_button { visibility: hidden; width: 0px; }';
if (!head) {return}
style.type = 'text/css';
try {style.innerHTML = css} catch(x) {style.innerText = css}
head.appendChild(style);