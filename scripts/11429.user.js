// ==UserScript==
// @name           Digg Keyboard Shortcuts
// @namespace      http://userscripts.org/scripts/show/11429
// @description    This user script adds 'digg' (d) and 'view' (v) keyboard shortcuts to digg.com.
// @include        http://digg.com/*
// @include        http://www.digg.com/*
// ==/UserScript==

window.addEventListener('load', diggKeyboardShortcuts, false);

function diggKeyboardShortcuts (e) {
  if (document.getElementById('title')){
    var __articleLink = document.getElementById('title').getElementsByTagName('a')[0];
    __articleLink.setAttribute('accesskey', 'v');
    if (document.getElementById('diglink1').getElementsByTagName('a')[0]){
      var __diggLink = document.getElementById('diglink1').getElementsByTagName('a')[0];
      __diggLink.setAttribute('accesskey', 'd');
    }
  }
}