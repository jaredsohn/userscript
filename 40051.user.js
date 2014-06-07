// ==UserScript==
// @name           OhjelmatINFOSafeURL
// @namespace      OhjelmatINFOSafeURL
// @description    Remove account stuff from URL
// @include        http://elisa.net/elisatv/tvjaradio/tv/ohjelmat.tv?*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i=0; i < links.length; i++) {
  links[i].setAttribute("href", links[i].getAttribute("href").replace(/\?.+?\&id\=/, "?id="));
}
