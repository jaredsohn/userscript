// ==UserScript==
// @name           Always Open New Windows in Digg
// @namespace      digg
// @description    Always open new windows in Digg
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// ==/UserScript==
for(var i=0; i < document.links.length; i++) {
     document.links[i].target = "_blank";
 }