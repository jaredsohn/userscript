// ==UserScript==
// @name          HTML5 Slider
// @namespace     html5, slider
// @description   Позволяет использовать HTML5 Slider
// @include       *
// ==/UserScript==

window.addEventListener('load', function () {
var tohead = document.getElementsByTagName("head")[0];         
var h5slider = document.createElement('script');
h5slider.type = 'text/javascript';
h5slider.src = '//github.com/fryn/html5slider/raw/master/html5slider.js';
tohead.appendChild(h5slider);
}, false);