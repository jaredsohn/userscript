// ==UserScript==
// @name           Feedbin Lite
// @namespace      feedbin.me
// @include        https://feedbin.me/*
// ==/UserScript==

try{
  var styles = "@import url('http://g-reader-xs.googlecode.com/files/null.css');";
  var newSS=document.createElement('link');
  newSS.rel='stylesheet';
  newSS.href='data:text/css,'+escape(styles);
  document.getElementsByTagName("head")[0].appendChild(newSS);
}catch(err){}