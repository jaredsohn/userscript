// ==UserScript==
// @name           Grooveshark VIP favicon
// @namespace      Eyal Amuday
// @description    Adds the VIP favicon to Groveshark
// @include        http://listen.grooveshark.com/*
// ==/UserScript==
var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'http://b.imagehost.org/0361/gs24.png';
favicon_link_html.type = 'image/png';

try {
document.getElementsByTagName('head')[0].appendChild( favicon_link_html );
}
catch(e) { }
