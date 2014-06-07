// ==UserScript==
// @name           Fix Magnet links when browsing with Anonymouse
// @namespace      nl.masida
// @author         Matthias Pronk
// @include        http://anonymouse.org/*
// @include        http://www.anonymouse.org/*
// ==/UserScript==

var links=document.getElementsByTagName("a"); //array
var regex=/^http:\/\/anonymouse.org\/cgi-bin\/anon-www\.cgi\/magnet\:(.+)$/i;
for (var i=0, imax=links.length; i<imax; i++) {
   links[i].href = links[i].href.replace(regex,"magnet:$1");
}
