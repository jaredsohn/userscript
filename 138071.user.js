// ==UserScript==
// @name           UPPERCASE ONLY
// @namespace      UPPERCASEONLY
// @description    TRANSFORM ALL CHARS TO UPPERCASE VIA CSS
// @include        *
// @version        1.0
// @author         davidkn
// ==/UserScript==

var css = document.createElement('style');
css.innerHTML = '* { text-transform: uppercase !important; }';
document.head.appendChild(css);