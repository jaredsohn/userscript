// ==UserScript==
// @name           Old Pocket Query Maps
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Transforms a Pocket Query Map link url from the new maps to the old maps
// @version        1.2
// @include        http://www.geocaching.com/pocket/*
// ==/UserScript==

var links, pqLink;
var oldUrl, newUrl;
var pqGuid;

links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
  pqLink = links[i];
  oldUrl = pqLink.href;
  if (oldUrl.indexOf('/map/beta/default.aspx') != -1) {
    pqGuid   = pqLink.getAttribute('data-guid');
    newUrl = '/map/default.aspx?guid=' + pqGuid;
    pqLink.href = newUrl;
  }
}
