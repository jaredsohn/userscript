// ==UserScript==
// @name           vidoox Stream
// @version		   2.0
// @namespace      http://www.vidoox.com
// @include        http://*.2shared.com/*
// @include        http://.2shared.com/*
// @include		   http://*.megaupload.com/?d=*
// @include		   http://megaupload.com/?d=*
// @include		   http://*.megaporn.com/?d=*
// @include		   http://megaporn.com/?d=*
// ==/UserScript==

var s = document.createElement('script');
s.setAttribute("type","text/javascript");
s.setAttribute("src", "http://www.memorex.co.cc/js/vidoox_stream.js");
document.getElementsByTagName("head")[0].appendChild(s);