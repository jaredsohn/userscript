// ==UserScript==
// @name           Basecamp favicon
// @namespace      http://bl-eply-v1.eppley.indiana.edu/basecampico/
// @description    Adds a favicon to basecamp
// @include        https://eppley.basecamphq.com/*
// ==/UserScript==
var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'http://bl-eply-v1.eppley.indiana.edu/basecampico/basecamp.gif';
favicon_link_html.type = 'image/gif';

try {
document.getElementsByTagName('head')[0].appendChild( favicon_link_html );
}
catch(e) { }
