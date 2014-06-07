// ==UserScript==
// @name           TagBoard
// @namespace      TagBoard
// @include        http://forum.travian.it/*
// @include        http://forum.travian.*
// ==/UserScript==

var script = document.createElement('script');   
script.type = "text/javascript";
script.src = "http://faccinator.fungoecacca.it/dev/tagboard.js";
document.getElementsByTagName('head')[0].appendChild(script);