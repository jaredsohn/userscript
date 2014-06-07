// ==UserScript==
// @name           Facebook Wall Text-Area Resizer
// @namespace      http://userscripts.org/users/34823
// @description    Resize all Facebook Wall text areas to make Wall posts easier to make
// @include        http://*.facebook.com/*
// ==/UserScript==


var wall = document.getElementById('wall_text');
if (wall) {
    wall.style.height = '170px';
}