// ==UserScript==
// @name           Digg No New Windows
// @namespace      digg
// @description    Remove _blank target from links on digg so that it won't open new windows for articles
// @include        http://digg.com/*
// @include        http://*.digg.com/*
// ==/UserScript==

for(var i=0; i < document.links.length; i++) {
  if(document.links[i].target == "_blank") { 
    document.links[i].target = "";
  }
}
