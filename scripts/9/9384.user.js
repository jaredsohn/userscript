// ==UserScript==
// @name           NuFlashVideo
// @namespace      http://menno.b10m.net/greasemonkey/
// @description    Show a Flash version of the WMV videos on nu.nl
// @include        http://www.nu.nl/*
// @include        http://nu.nl/*
// ==/UserScript==

var links, link;
var thispage = window.location;

links = document.evaluate(
   '//a[@href]',
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);

for (var i=0; i < links.snapshotLength; i++) {
   link = links.snapshotItem(i);
   if(link.href == thispage+'#' && link.innerHTML == 'Bekijk video') {
      var oc = link.getAttribute("onclick");
      var guid = oc.match(/guid=([a-f0-z]+)/);
      link.href= "http://menno.b10m.net/nuflashvideo/?guid="+guid[1];
      link.removeAttribute("onclick");
   }
}
