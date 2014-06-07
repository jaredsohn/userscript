// ==UserScript==
// @name           OSMI-FHB Forum Seite 1 Fix
// @namespace      osmi-fhb.de
// @description    Behebt das Problem, dass die erste Seite in Threads nicht geöffnet werden kann.
// @include http://*osmi-fhb.de/*
// ==/UserScript==

var AllLinks = new Array();
AllLinks = document.getElementsByTagName("a");

for(var i = 0; i < AllLinks.length; i++){
  if (AllLinks[i].href.indexOf('&id=') != -1 && AllLinks[i].href.indexOf('&limitstart=') == -1) AllLinks[i].href = AllLinks[i].href+"&limitstart=0";
}
