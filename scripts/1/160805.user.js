// ==UserScript==
// @name           AlldataFavicon
// @namespace      http://dasautopro.net/
// @description    A favicon fix for Alldatapro
// @include        http://*.alldatapro.com/*
// @include        http://*.alldata.com/*
// @include        http://alldatapro.com/*
// ==/UserScript==
 
var favicon_link_html = document.createElement('link');
favicon_link_html.rel = 'shortcut icon';
favicon_link_html.href = 'http://content2.alldata.digitaldeployment.net/sites/main/files/dtheme_favicon.ico';
favicon_link_html.type = 'image/x-icon';
 
try { 
  document.getElementsByTagName('head')[0].appendChild( favicon_link_html ); 
}
catch(e) { }
