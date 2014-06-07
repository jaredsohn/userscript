// ==UserScript==
// @name           boerse.bz
// @namespace      boerse.bz
// @include        http://www.boerse.bz/*
// ==/UserScript==

var AllLinks = new Array();
AllLinks = document.getElementsByTagName("a");
for(var i = 0; i < AllLinks.length; i++){
  AllLinks[i].href = AllLinks[i].href.replace(/http:\/\/www\.boerse\.bz\/out\/\?url\=/g, "");
}