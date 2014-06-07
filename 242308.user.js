// ==UserScript==
// @name       Mediafire Listen to Download links
// @namespace  http://mkody.info/social/
// @version    0.2
// @description  Remplace all Mediafire Listen links by Download links on webpages (Only on href, no "visual" change)
// @include   http://*/*
// @include   https://*/*
// @exclude   http://www.mediafire.com/*
// @exclude   https://www.mediafire.com/*
// @copyright  2014+, MKody
// ==/UserScript==

var links = document.getElementsByTagName("a"); //array
var regex = /^(http:\/\/)([^\.]+)(\.mediafire\.com\/listen\/)(.+)$/i;
for (var i=0,imax=links.length; i<imax; i++) {
    links[i].href = links[i].href.replace(regex,"http://www.mediafire.com/download/$4");
}