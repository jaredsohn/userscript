// ==UserScript==
// @name          Highrise Favicons
// @namespace     http://robbyonrails.com/greasemonkey
// @description	  Add a favicon to Highrise
// @include       https://*.highrisehq.com/*
// @include       http://*.highrisehq.com/*
// ==/UserScript==

var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'http://planetargon.com/files/highrise-favicon.ico';
favicon_link_html.type = 'image/x-icon';

try { 
  document.getElementsByTagName('head')[0].appendChild( favicon_link_html ); 
}
catch(e) { }