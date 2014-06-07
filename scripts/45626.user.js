// ==UserScript==
// @name          Youtube Flipper
// @description   Flips every youtube page you visit
// @exclude       http://*.youtube.*/watch?*&flip=1*
// @include       http://*.youtube.*/watch?*
// ==/UserScript==

window.location = document.location.href + "&flip=1";