// ==UserScript==
// @name           Riphoven
// @namespace      http://what.cd
// @description    Rippy modded to use the winning Rippy avatar competition entry from Dejital - By Karlbright - fix by huperphuff
// @include        https://ssl.what.cd/*
// @include        http://what.cd/*
// @include        http://www.what.cd/*
// ==/UserScript==

function addGlobalStyle() {
  var head, link;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  link = document.createElement('link');
  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = 'http://dl.dropbox.com/u/2115840/gm/riphoven.css';
  head.appendChild(link);
}

addGlobalStyle();