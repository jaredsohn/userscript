// ==UserScript==
// @name           Pony+
// @namespace      kireas
// @description    The Pony+ Addon Script
// @include        *plus.google.com/*
// ==/UserScript==

var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'http://poketch.net/ponyplus/favicons/plus-favicon.png';
favicon_link_html.type = 'image/x-icon';

try { 
  document.getElementsByTagName('head')[0].appendChild( favicon_link_html ); 
}
catch(e) { }