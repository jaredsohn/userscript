// ==UserScript==
// @name           Google Sponsored Links remover
// @namespace      http://www.h4md1.fr
// @description    remove google sponsored links from SERPS
// @include        http://www.google.com/*
// @include        http://www.google.fr/*
// ==/UserScript==

(function() {
  var sidebarads = document.getElementById('mbEnd');
  var skyads = document.getElementById('tads');
  if (sidebarads) {
    sidebarads.parentNode.removeChild(sidebarads);
    }
  if (skyads) {
    skyads.parentNode.removeChild(skyads);
    }  
  }
)();