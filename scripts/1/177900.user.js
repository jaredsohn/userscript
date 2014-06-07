// ==UserScript==
// @name        YouTube auto HTML5
// @namespace   localhost
// @description Automatically enables HTML5 video viewing where ever possible by adding "&html5=1" to the video URL.
// @include     *youtube.*/watch*
// @exclude     *youtube.*/watch*&html5=1*
// @version     1
// @grant
// ==/UserScript==
var url=(document.URL);
window.location.href = url+"&html5=1"; 