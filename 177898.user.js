// ==UserScript==
// @name        YouTube auto HD
// @namespace   localhost
// @include     *.youtube.*/watch*
// @exclude     *.youtube.*/watch*&hd=1*
// @version     1
// @grant       
// ==/UserScript==
var url=(document.URL);
window.location.href = url+"&hd=1"; 