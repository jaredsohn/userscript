// ==UserScript==
// @name           plug.dj DNBR canvas remove
// @namespace      Punkred
// @include        http://plug.dj/dnbrtv/
// @include        http://www.plug.dj/dnbrtv/
// @include        www.plug.dj/dnbrtv/
// @include        plug.dj/dnbrtv/
// @include        socketio.plug.dj/dnbrtv/
// @include        http://socketio.plug.dj/dnbrtv/
// @version        2.1
// ==/UserScript==


javascript: (function () { 
var jsCode = document.createElement('script');
jsCode.setAttribute('src', 'https://raw.github.com/Cruto/DnBplug/patch-1/plug.js'); 
document.body.appendChild(jsCode); }());