// ==UserScript==
// @name           Drupal.org Favicon
// @description    A different favicon for drupal.org
// @include        http://*drupal.org/*
// ==/UserScript==


var full = window.location.host;
var parts = full.split('.');
var url = 'http://corbacho.info/img/drupal-favicon.ico';

if (parts[0] === 'api'){
  url = 'http://corbacho.info/img/api-favicon.ico';
} 

var newFv = document.createElement('link');
newFv.rel = 'icon';
newFv.type = 'image/png';
newFv.href = url;

try {   
  document.getElementsByTagName('head')[0].appendChild(newFv); 
}
catch(e) { }