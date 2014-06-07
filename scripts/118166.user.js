// ==UserScript==
// @name           fixlinks
// @namespace      http://userscripts.org/users/florestan
// @include        https://forums.eveonline.com/*
// ==/UserScript==

var links = document.getElementsByTagName("a");
var regex = /https:\/\/forums.eveonline.com\/default.aspx\?g=warning&?l=(.*)&domain.*/g;
for (var i=0,imax=links.length; i<imax; i++) {
  links[i].href = unescape(links[i].href.replace(regex,"$1"));
}
