// ==UserScript==
// @name           BasilMarket.com Anti-link protector
// @namespace      bm
// @include        http://www.basilmarket.com/bye.php*
// ==/UserScript==

//It's one freakin' line of code. @_@

window.location = 'http://' + document.URL.split('u=')[1];
