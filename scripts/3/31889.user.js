// ==UserScript==
// @name           Heise ohne Banner
// @description    Heise ohne Banner & Artikelüberschriften der 7-Tage-News nicht fett
// @include        http://*.heise.de/*
// ==/UserScript==
//
// By: André Goerres
// Email: andre.goerres at gmx.net
// Last Update:  08/15/2008

document.getElementById('container_content').style.top = '15px';
document.getElementById('bannerzone').style.display = 'none';

var head = document.getElementsByTagName('head')[0];
if (head) { 
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = '.tage a { font-weight: normal; } .tage div { text-indent: -8px; padding-left: 8px; }';
  head.appendChild(style);
}
