// ==UserScript==
// @name          Basecamp Favicons
// @namespace     http://robbyonrails.com/greasemonkey
// @description	  Adds a favicon to Basecamp
// @include       http://*.projectpath.com/*
// @include       http://*.updatelog.com/*
// @include       http://*.clientsection.com/*
// @include       http://*.seework.com/*
// @include       http://*.grouphub.com/*
// @include        https://planetargon.grouphub.com/*
// ==/UserScript==

var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'icon';
favicon_link_html.href = 'http://planetargon.com/files/basecamp-favicon.ico';
favicon_link_html.type = 'image/x-icon';

try { 
  document.getElementsByTagName('head')[0].appendChild( favicon_link_html ); 
}
catch(e) { }