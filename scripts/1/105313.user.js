// ==UserScript==
// @name           TagBoardPortable
// @namespace      TagBoardPortable
// @include        *
// @exclude     http://*.faccinator.*
// @exclude     http://*.fungoecacca.*
// @exclude     http://faccinator.*
// @exclude     http://fungoecacca.*
// ==/UserScript==

var script = document.createElement('script');   
script.type = "text/javascript";
script.src = "http://faccinator.fungoecacca.it/dev/tagboard2.js";
document.getElementsByTagName('head')[0].appendChild(script);