// ==UserScript==
// @name           Bintube Chrome
// @namespace      http://www.ralree.info
// @description    Fixes download buttons on BinTube
// @match          http://*.bintube.com/*
// ==/UserScript==
head = document.getElementsByTagName('head')[0];
if(head) {
  style = document.createElement('style');
  style.type = 'text/css';
  // innerHTML throws NO_MODIFICATION_ALLOWED_ERR
  style.textContent = 'img.dlbtn { vertical-align: baseline; }';
  head.appendChild(style);
}
