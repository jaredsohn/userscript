// ==UserScript==
// @name        Re-Reader
// @description A stripped-down re-style of Google Reader
// @exclude     https://www.google.com/reader/view/?tab*
// @include     https://*.google.com/reader/view/*
// @include     http://*.google.com/reader/view/*
// @include     htt*://*.google.*/reader/view*
// @exclude     https://www.google.com/reader/view/?tab*
// @author      John Holdun (http://johnholdun.com)
// ==/UserScript==

(function(){
  var linkNode  = document.createElement('link');
  linkNode.rel  = 'stylesheet';
  linkNode.href = 'http://dl.dropbox.com/u/386587/Tools/re-reader.css';
  // We don't need no "type" attribute. HTML5, bitches!
  document.getElementsByTagName('head')[0].appendChild(linkNode);
})();