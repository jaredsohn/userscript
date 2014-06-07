// ==UserScript==
// @name           Google Reader less CSS
// @namespace      google.com/reader
// @include        http://www.google.com/reader/*
// ==/UserScript==

try{
  var styles = "@import url('http://g-reader-xs.googlecode.com/files/g-reader-xs.css');";
  var newSS=document.createElement('link');
  newSS.rel='stylesheet';
  newSS.href='data:text/css,'+escape(styles);
  document.getElementsByTagName("head")[0].appendChild(newSS);
}catch(err){}